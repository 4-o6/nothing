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
 * Resolves the API key. 
 * Prioritizes process.env.API_KEY (Vercel) but falls back to the manual selector if empty.
 */
const getActiveApiKey = async (): Promise<string> => {
  const envKey = process.env.API_KEY;
  if (envKey && envKey.length > 10) return envKey;

  const aistudio = (window as any).aistudio;
  if (aistudio) {
    const hasKey = await aistudio.hasSelectedApiKey();
    if (!hasKey) {
      await aistudio.openSelectKey();
    }
  }
  return process.env.API_KEY || "";
};

/**
 * Handles API errors by checking for missing entities and prompting for a key reset.
 */
const handleApiError = (error: any) => {
  console.error("Gemini API Error:", error);
  // If the key is invalid or expired, trigger the selection dialog
  if (error?.message?.includes("API key not valid") || error?.message?.includes("Requested entity was not found")) {
    if (typeof window !== 'undefined' && (window as any).aistudio?.openSelectKey) {
      (window as any).aistudio.openSelectKey();
    }
  }
};

/**
 * Generates a sustainable itinerary using Gemini 3 Pro for complex reasoning.
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
    
    const prompt = `
      Generate a ${days}-day sustainable travel itinerary for Mysore, India.
      Traveler Profile: ${groupType}
      Interests: ${interests.join(', ')}
      
      Focus on decentralized tourism:
      - Suggest specific artisan workshops (Inlay, Silk, Ganjifa).
      - Include nature spots like Blue Lagoon or Karanji Lake.
      - Prioritize Agrahara heritage walks over commercial malls.
      
      Return valid JSON only.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
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
                  activity: { type: Type.STRING },
                  location: { type: Type.STRING },
                  notes: { type: Type.STRING },
                  isSustainable: { type: Type.BOOLEAN }
                },
                required: ["time", "activity", "location"]
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
      title: "Essential Heritage Trail",
      items: [
        { time: "07:00 AM", activity: "Yoga at Gokulam", location: "Gokulam", notes: "Experience Mysore's world-famous yoga culture.", isSustainable: true },
        { time: "09:30 AM", activity: "Mylari Dosa", location: "Nazarbad", notes: "Visit the original heritage eatery.", isSustainable: true },
        { time: "11:30 AM", activity: "Rosewood Inlay Visit", location: "Tilak Nagar", notes: "Support local master artisans.", isSustainable: true }
      ],
      seasonalGuidelines: ["Carry water for the warm afternoons."],
      safetyTips: ["Ask for artisan permission before filming."]
    };
  }
};

/**
 * Searches for hidden gems using Maps Grounding on Gemini 2.5 Flash.
 */
export const searchHiddenGems = async (query: string, userLocation?: {lat: number, lng: number}): Promise<{text: string, chunks: any[]}> => {
  try {
    const apiKey = await getActiveApiKey();
    const ai = new GoogleGenAI({ apiKey });
    const model = "gemini-2.5-flash"; 
    
    const prompt = `
      Identify authentic, off-the-beaten-path cultural spots or local artisan studios in Mysore for: "${query}".
      Explain the heritage value of each.
    `;

    const config: any = {
      tools: [{ googleMaps: {} }, { googleSearch: {} }],
    };
    
    if (userLocation) {
      config.toolConfig = {
        retrievalConfig: {
          latLng: {
            latitude: userLocation.lat,
            longitude: userLocation.lng
          }
        }
      };
    }

    const response = await ai.models.generateContent({
      model,
      contents: [{ parts: [{ text: prompt }] }],
      config
    });

    return {
      text: response.text || "No hidden gems matched your search.",
      chunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    handleApiError(error);
    return { 
      text: "Heritage network connection is active but searching. Please refine your query or refresh.", 
      chunks: [] 
    };
  }
};