import { GoogleGenAI, Type } from "@google/genai";
import { Itinerary, Place } from "../types";

// NOTE: In a real app, strict error handling for missing API keys is essential.
// We assume process.env.API_KEY is available as per instructions.

// We check if the key exists to prevent immediate runtime crashes (White Screen of Death)
// if the environment variable is missing in deployment.
const apiKey = process.env.API_KEY || "";
if (!apiKey) {
  console.warn("API Key is missing. Check your environment variables.");
}

const ai = new GoogleGenAI({ apiKey });

export const generateSustainableItinerary = async (
  days: number,
  interests: string[],
  groupType: string
): Promise<Itinerary> => {
  const model = "gemini-3-flash-preview";
  
  const prompt = `
    Create a ${days}-day sustainable tourism itinerary for Mysore.
    Group Type: ${groupType}
    Interests: ${interests.join(', ')}
    
    CRITICAL INSTRUCTIONS:
    1. AVOID the main Mysore Palace, Zoo, and Chamundi Hills during peak hours (10 AM - 4 PM).
    2. Suggest visiting these popular spots ONLY early morning or late evening if necessary.
    3. PRIORITIZE local artisans, heritage walks in Agrahara, hidden lakes (like Kukkarahalli), and authentic small eateries (messes) over commercial hotels.
    4. Focus on 'Decentralized Tourism' - sending people to Nanjangud, Srirangapatna (lesser known spots), or local craft workshops.
    5. Include 3-4 specific seasonal guidelines considering Mysore's weather pattern (e.g. hydration, best time for outdoors).
    6. Include 3-4 safety measures/tips relevant to the itinerary (e.g. auto fares, crowds).
    7. Return JSON format.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            seasonalGuidelines: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
            },
            safetyTips: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
            },
            items: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  time: { type: Type.STRING },
                  activity: { type: Type.STRING },
                  location: { type: Type.STRING },
                  notes: { type: Type.STRING },
                  isSustainable: { type: Type.BOOLEAN, description: "True if this supports local artisans or reduces overcrowding" }
                }
              }
            }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as Itinerary;
    }
    throw new Error("No itinerary generated");
  } catch (error) {
    console.error("Gemini Itinerary Error:", error);
    throw error;
  }
};

export const searchHiddenGems = async (query: string, userLocation?: {lat: number, lng: number}): Promise<{text: string, chunks: any[]}> => {
  // Use Gemini 2.5 Flash for Maps Grounding as per guidelines
  const model = "gemini-2.5-flash";
  
  const prompt = `Find authentic, non-touristy, hidden gems in Mysore related to: "${query}". 
  Focus on traditional artisans, heritage homes, or local food messes. 
  Explain why they are special and how they help the local economy.`;

  try {
    const config: any = {
      tools: [{ googleMaps: {} }],
    };
    
    // Add location grounding if available
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
      contents: prompt,
      config
    });

    return {
      text: response.text || "No results found.",
      chunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    console.error("Gemini Search Error:", error);
    return { text: "Sorry, I couldn't connect to the heritage database right now.", chunks: [] };
  }
};