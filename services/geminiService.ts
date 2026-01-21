import { GoogleGenAI, Type } from "@google/genai";
import { Itinerary } from "../types";

/**
 * Robust JSON extraction for LLM responses
 */
const extractJson = (text: string): string => {
  try {
    const jsonMatch = text.match(/```json\n?([\s\S]*?)\n?```/) || text.match(/\{[\s\S]*\}/);
    const cleaned = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : text;
    return cleaned.trim();
  } catch (e) {
    return text;
  }
};

/**
 * Resolves the API key with priority for process.env.
 */
const getActiveApiKey = async (): Promise<string> => {
  const envKey = process.env.API_KEY;
  if (envKey && envKey.length > 10) return envKey;

  const aistudio = (window as any).aistudio;
  if (aistudio) {
    const hasKey = await aistudio.hasSelectedApiKey();
    if (!hasKey) {
      // Prompt user if no key is baked in
      await aistudio.openSelectKey();
    }
  }
  return process.env.API_KEY || "";
};

const handleApiError = (error: any) => {
  console.error("Gemini API Error:", error);
  if (error?.message?.includes("API key not valid") || error?.message?.includes("Requested entity was not found")) {
    if (typeof window !== 'undefined' && (window as any).aistudio?.openSelectKey) {
      (window as any).aistudio.openSelectKey();
    }
  }
};

/**
 * Generates a sustainable itinerary with strict quality controls.
 */
export const generateSustainableItinerary = async (
  days: number,
  interests: string[],
  groupType: string
): Promise<Itinerary> => {
  try {
    const apiKey = await getActiveApiKey();
    const ai = new GoogleGenAI({ apiKey });
    const model = "gemini-3-pro-preview"; 
    
    const systemInstruction = `
      You are the "Mysuru Heritage Architect". Your goal is to decentralize tourism away from the Mysore Palace.
      
      STRICT RULES:
      1. NO generic malls or international food chains.
      2. NO suggesting the Palace between 11 AM and 4 PM (peak crowd).
      3. MANDATORY inclusion of specific artisan hubs: 
         - Tilak Nagar (Rosewood Inlay)
         - Agrahara (Silk Weavers)
         - Mandi Mohalla (Heritage Non-Veg Food)
         - Gokulam (Yoga & Slow Living)
      4. Suggest hidden natural gems: Blue Lagoon, KRS Backwaters, or Karanji Lake.
      5. Every activity must have a "Sustainability Impact" explaining why it helps locals.
      6. Return results in strict JSON format.
    `;

    const userPrompt = `
      Create a ${days}-day plan for a ${groupType}. 
      Focus on: ${interests.join(', ')}.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: [{ parts: [{ text: userPrompt }] }],
      config: {
        systemInstruction,
        temperature: 0.2, // Low temperature for high consistency/determinism
        seed: 42,        // Fix the seed to ensure Vercel and AI Studio align better
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            seasonalGuidelines: { type: Type.ARRAY, items: { type: Type.STRING } },
            safetyTips: { type: Type.ARRAY, items: { type: Type.STRING } },
            items: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  time: { type: Type.STRING },
                  duration: { type: Type.STRING },
                  category: { type: Type.STRING },
                  activity: { type: Type.STRING },
                  location: { type: Type.STRING },
                  notes: { type: Type.STRING },
                  isSustainable: { type: Type.BOOLEAN },
                  impactReason: { type: Type.STRING }
                },
                required: ["time", "activity", "location", "category"]
              }
            }
          },
          required: ["title", "items"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(extractJson(response.text)) as Itinerary;
    }
    throw new Error("Empty response");
  } catch (error) {
    handleApiError(error);
    return {
      title: "The Artisan's Path (Fallback Route)",
      items: [
        { 
          time: "07:00 AM", 
          duration: "2 Hours",
          category: "culture",
          activity: "Gokulam Heritage Walk", 
          location: "Gokulam", 
          notes: "Explore the global capital of Ashtanga Yoga at a slow pace.", 
          isSustainable: true,
          impactReason: "Supports small-scale neighborhood tourism."
        },
        { 
          time: "10:30 AM", 
          duration: "2 Hours",
          category: "artisan",
          activity: "Rosewood Inlay Workshop", 
          location: "Tilak Nagar", 
          notes: "See the rhythmic tapping of master craftsmen creating intricate wood art.", 
          isSustainable: true,
          impactReason: "Direct support to family-run heritage craft units."
        },
        { 
          time: "01:00 PM", 
          duration: "1.5 Hours",
          category: "food",
          activity: "Heritage Lunch at Hanumanthu", 
          location: "Mandi Mohalla", 
          notes: "Famous nati-style mutton pulao that has served the city for generations.", 
          isSustainable: true,
          impactReason: "Preserves the culinary heritage of the Old City."
        }
      ],
      seasonalGuidelines: ["Wear comfortable cotton clothing for Agrahara walks."],
      safetyTips: ["Support artisans by purchasing directly from their home studios."]
    };
  }
};

/**
 * Enhanced search for hidden gems using Maps Grounding.
 */
export const searchHiddenGems = async (query: string, userLocation?: {lat: number, lng: number}): Promise<{text: string, chunks: any[]}> => {
  try {
    const apiKey = await getActiveApiKey();
    const ai = new GoogleGenAI({ apiKey });
    const model = "gemini-2.5-flash"; 
    
    const systemInstruction = `
      You are a specialized Mysuru Heritage Guide. 
      Search only for "Hidden Gems" - places not usually found in top 10 TripAdvisor lists.
      Focus on decentralization and artisan stories.
    `;

    const config: any = {
      systemInstruction,
      temperature: 0.1,
      tools: [{ googleMaps: {} }, { googleSearch: {} }],
    };
    
    if (userLocation) {
      config.toolConfig = {
        retrievalConfig: { latLng: { latitude: userLocation.lat, longitude: userLocation.lng } }
      };
    }

    const response = await ai.models.generateContent({
      model,
      contents: [{ parts: [{ text: query }] }],
      config
    });

    return {
      text: response.text || "No heritage records found.",
      chunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    handleApiError(error);
    return { text: "Connecting to the heritage network... Please try again in a moment.", chunks: [] };
  }
};