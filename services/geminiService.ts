import { GoogleGenAI, Type } from "@google/genai";
import { Itinerary } from "../types";

/**
 * Robust JSON extraction from LLM responses
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
 * Handles API errors, specifically looking for missing API key configuration
 */
const handleApiError = (error: any) => {
  if (error?.message?.includes("Requested entity was not found.")) {
    // Reset key selection state by prompting the user as per guidelines
    if (typeof window !== 'undefined' && (window as any).aistudio?.openSelectKey) {
      (window as any).aistudio.openSelectKey();
    }
  }
};

/**
 * Generates a sustainable itinerary using Gemini 3
 */
export const generateSustainableItinerary = async (
  days: number,
  interests: string[],
  groupType: string
): Promise<Itinerary> => {
  // Use the injected API_KEY directly and create a new instance before call as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = "gemini-3-pro-preview"; // Upgraded to Pro for complex reasoning task
  
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

    const text = response.text;
    if (text) {
      return JSON.parse(extractJson(text)) as Itinerary;
    }
    throw new Error("Empty response");
  } catch (error) {
    handleApiError(error);
    console.error("Itinerary Generation Failed:", error);
    return {
      title: "Essential Mysuru Heritage Route",
      items: [
        { time: "06:30 AM", activity: "Yoga at Gokulam", location: "Gokulam 3rd Stage", notes: "Experience Mysore's world-famous Ashtanga heritage.", isSustainable: true },
        { time: "09:00 AM", activity: "Mylari Breakfast", location: "Nazarbad", notes: "A zero-waste local culinary institution.", isSustainable: true },
        { time: "11:00 AM", activity: "Inlay Workshop Visit", location: "Tilak Nagar", notes: "Support master craftsmen directly.", isSustainable: true }
      ],
      seasonalGuidelines: ["Stay hydrated during afternoon hours."],
      safetyTips: ["Verify artisan availability before visiting."]
    };
  }
};

/**
 * Searches for hidden gems using Maps Grounding on Gemini 2.5
 */
export const searchHiddenGems = async (query: string, userLocation?: {lat: number, lng: number}): Promise<{text: string, chunks: any[]}> => {
  try {
    // Create new GoogleGenAI instance right before making an API call
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const model = "gemini-2.5-flash"; // Required for Maps Grounding
    
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
      text: response.text || "No results found for that heritage query.",
      chunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    handleApiError(error);
    console.error("Grounding Search Failed:", error);
    return { 
      text: "Heritage search is currently initializing. Please try again in a moment or explore our curated list.", 
      chunks: [] 
    };
  }
};
