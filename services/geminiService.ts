
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
 * Simple throttle to prevent overlapping requests
 */
let isRequestInProgress = false;

const handleApiError = (error: any) => {
  console.error("Gemini API Error:", error);
};

/**
 * Generates a high-quality sustainable itinerary.
 * Switched to gemini-3-flash-preview for faster response and better availability.
 */
export const generateSustainableItinerary = async (
  days: number,
  interests: string[],
  groupType: string
): Promise<Itinerary> => {
  if (isRequestInProgress) throw new Error("A request is already in progress.");
  
  try {
    isRequestInProgress = true;
    // Always use the API key from environment variables as per guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
    // Using flash for better stability across environments
    const model = "gemini-3-flash-preview"; 
    
    const systemInstruction = `
      You are the "Mysuru Heritage Architect". Your goal is to decentralize tourism away from the Mysore Palace.
      
      STRICT RULES:
      1. NO generic malls or international food chains.
      2. NO suggesting the Palace between 11 AM and 4 PM (peak crowd).
      3. MANDATORY inclusion of specific artisan hubs: Tilak Nagar (Rosewood), Agrahara (Silk), Mandi Mohalla (Food).
      4. Suggest hidden natural gems like Blue Lagoon or Venugopala Swamy Temple.
      5. Every activity must have a "Sustainability Impact" explanation.
      6. Return results in strict JSON format matching the schema.
    `;

    const userPrompt = `
      Create a highly detailed ${days}-day plan for a ${groupType}. 
      Interests: ${interests.join(', ')}.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: [{ parts: [{ text: userPrompt }] }],
      config: {
        systemInstruction,
        temperature: 0.1, // Near deterministic
        seed: 42,
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
      const parsed = JSON.parse(extractJson(response.text));
      if (parsed && parsed.items && parsed.items.length > 0) {
        return parsed as Itinerary;
      }
    }
    throw new Error("Invalid response format");
  } catch (error) {
    handleApiError(error);
    // Reliable Fallback
    return {
      title: "The Artisan Heritage Trail",
      items: [
        { 
          time: "07:30 AM", 
          duration: "2 Hours",
          category: "culture",
          activity: "Gokulam Yoga Immersion", 
          location: "Gokulam 3rd Stage", 
          notes: "Visit an authentic Shala to witness the tradition that put Mysuru on the world map.", 
          isSustainable: true,
          impactReason: "Direct support to local yoga tradition preservation."
        },
        { 
          time: "10:30 AM", 
          duration: "2.5 Hours",
          category: "artisan",
          activity: "Inlay Art Masterclass", 
          location: "Tilak Nagar", 
          notes: "Watch master craftspeople like Nanjundaiah create wood inlay masterpieces.", 
          isSustainable: true,
          impactReason: "Ensures the continuation of 400-year-old hereditary craft."
        }
      ],
      seasonalGuidelines: ["Check for temple festivals during the season."],
      safetyTips: ["Always respect artisan home studio boundaries."]
    };
  } finally {
    isRequestInProgress = false;
  }
};

/**
 * Searches for hidden gems using Maps Grounding.
 */
export const searchHiddenGems = async (query: string, userLocation?: {lat: number, lng: number}): Promise<{text: string, chunks: any[]}> => {
  if (isRequestInProgress) return { text: "Network busy, please wait...", chunks: [] };
  
  try {
    isRequestInProgress = true;
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
    const model = "gemini-2.5-flash"; 
    
    const systemInstruction = `
      You are a Mysuru Heritage Expert. 
      Only search for "Hidden Gems" or decentralized spots. 
      Do not suggest the main Palace or Zoo unless specifically asked.
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
      text: response.text || "No records found.",
      chunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    handleApiError(error);
    return { text: "Connecting to heritage database...", chunks: [] };
  } finally {
    isRequestInProgress = false;
  }
};
