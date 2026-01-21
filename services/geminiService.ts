import { GoogleGenAI, Type } from "@google/genai";
import { Itinerary, Place } from "../types";

// Helper to get fresh AI instance
const getAI = () => {
  // Use apiKey directly from process.env as per environment standards
  const apiKey = process.env.API_KEY || "";
  if (!apiKey) {
    console.error("Gemini API Key is missing. Search and Planner will not function. Check environment variables.");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateSustainableItinerary = async (
  days: number,
  interests: string[],
  groupType: string
): Promise<Itinerary> => {
  const ai = getAI();
  // Using gemini-3-flash-preview for complex reasoning tasks as per guidelines
  const model = "gemini-3-flash-preview";
  
  const prompt = `
    Create a ${days}-day sustainable tourism itinerary for Mysore.
    Group Type: ${groupType}
    Interests: ${interests.join(', ')}
    
    CRITICAL INSTRUCTIONS:
    1. AVOID the main Mysore Palace, Zoo, and Chamundi Hills during peak hours (10 AM - 4 PM).
    2. Suggest visiting these popular spots ONLY early morning or late evening if necessary.
    3. PRIORITIZE local artisans, heritage walks in Agrahara, hidden lakes (like Kukkarahalli), and authentic small eateries (messes) over commercial hotels.
    4. Return JSON format.
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
                  isSustainable: { type: Type.BOOLEAN }
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
  try {
    const ai = getAI();
    // Maps Grounding requires gemini-2.5 series. Using the native audio preview for best performance.
    const model = "gemini-2.5-flash-native-audio-preview-12-2025";
    
    const prompt = `Find authentic, non-touristy, hidden gems in Mysore Karnataka related to: "${query}". Focus on traditional artisans or heritage sites.`;

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
      contents: prompt,
      config
    });

    return {
      text: response.text || "No specific hidden gems found for that query in Mysore.",
      chunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error: any) {
    console.error("Gemini Search Error:", error);
    return { 
      text: "Failed to connect to the heritage database. Please try again later.", 
      chunks: [] 
    };
  }
};