import { GoogleGenAI, Type } from "@google/genai";
import { Itinerary } from "../types";

/**
 * Ensures an API key is available.
 * If process.env.API_KEY is missing, it attempts to trigger the AI Studio key picker.
 */
const ensureApiKey = async (): Promise<string> => {
  const key = process.env.API_KEY;
  if (!key) {
    const aistudio = (window as any).aistudio;
    if (aistudio) {
      const hasKey = await aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await aistudio.openSelectKey();
      }
    }
  }
  return process.env.API_KEY || "";
};

const extractJson = (text: string): string => {
  try {
    const jsonMatch = text.match(/```json\n?([\s\S]*?)\n?```/) || text.match(/\{[\s\S]*\}/);
    const cleaned = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : text;
    return cleaned.trim();
  } catch (e) {
    return text;
  }
};

export const generateSustainableItinerary = async (
  days: number,
  interests: string[],
  groupType: string
): Promise<Itinerary> => {
  const apiKey = await ensureApiKey();
  const ai = new GoogleGenAI({ apiKey });
  const model = "gemini-3-flash-preview"; 
  
  const prompt = `
    Generate a ${days}-day sustainable travel itinerary for Mysore, India.
    Traveler Profile: ${groupType}
    Interests: ${interests.join(', ')}
    
    Rules:
    - Focus on decentralized tourism: avoid peak hours at the Palace.
    - Include specific artisan names (e.g., Nanjundaiah for Inlay).
    - Prioritize Agrahara heritage and hidden nature spots.
    - Response must be strictly valid JSON.
  `;

  try {
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
  } catch (error: any) {
    console.error("Itinerary Generation Failed:", error);
    if (error?.message?.includes("Requested entity was not found")) {
      (window as any).aistudio?.openSelectKey();
    }
    return {
      title: "Essential Mysuru Heritage Route (Offline Mode)",
      items: [
        { time: "06:30 AM", activity: "Yoga at Gokulam", location: "Gokulam 3rd Stage", notes: "Experience Mysore's world-famous Ashtanga heritage.", isSustainable: true },
        { time: "09:00 AM", activity: "Mylari Breakfast", location: "Nazarbad", notes: "A zero-waste local culinary institution.", isSustainable: true },
        { time: "11:00 AM", activity: "Inlay Workshop Visit", location: "Tilak Nagar", notes: "Support master craftsmen directly.", isSustainable: true }
      ],
      seasonalGuidelines: ["Check local weather for hydration needs."],
      safetyTips: ["Verify artisan hours before travel."]
    };
  }
};

export const searchHiddenGems = async (query: string, userLocation?: {lat: number, lng: number}): Promise<{text: string, chunks: any[]}> => {
  try {
    const apiKey = await ensureApiKey();
    const ai = new GoogleGenAI({ apiKey });
    const model = "gemini-2.5-flash"; 
    
    const prompt = `
      Find authentic, off-the-beaten-path cultural spots or local workshops in Mysore related to: "${query}".
      Provide historical context and why it's a hidden gem.
    `;

    const config: any = {
      tools: [{ googleMaps: {} }],
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
      text: response.text || "No records found.",
      chunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error: any) {
    console.error("Grounding Search Failed:", error);
    if (error?.message?.includes("Requested entity was not found")) {
      (window as any).aistudio?.openSelectKey();
    }
    return { 
      text: "Heritage search is currently initializing. Please try again or check our verified artisan list.", 
      chunks: [] 
    };
  }
};