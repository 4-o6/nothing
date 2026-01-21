import { GoogleGenAI, Type } from "@google/genai";
import { Itinerary } from "../types";

/**
 * Clean JSON strings that might contain Markdown code blocks
 */
const extractJson = (text: string): string => {
  const jsonMatch = text.match(/```json\n?([\s\S]*?)\n?```/) || text.match(/\{[\s\S]*\}/);
  return jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : text;
};

export const generateSustainableItinerary = async (
  days: number,
  interests: string[],
  groupType: string
): Promise<Itinerary> => {
  // Direct initialization as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  // Use pro model for complex reasoning tasks
  const model = "gemini-3-pro-preview";
  
  const prompt = `
    Create a ${days}-day sustainable tourism itinerary for Mysore, Karnataka.
    Group Type: ${groupType}
    Interests: ${interests.join(', ')}
    
    CRITICAL INSTRUCTIONS:
    1. AVOID the main Mysore Palace, Zoo, and Chamundi Hills during peak hours (10 AM - 4 PM).
    2. Suggest visiting these popular spots ONLY early morning or late evening if necessary.
    3. PRIORITIZE local artisans, heritage walks in Agrahara, hidden lakes (like Kukkarahalli), and authentic small eateries (messes) over commercial hotels.
    4. Provide specific names of locations.
    5. Ensure the response is valid JSON.
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
          },
          required: ["title", "items"]
        }
      }
    });

    const text = response.text;
    if (text) {
      return JSON.parse(extractJson(text)) as Itinerary;
    }
    throw new Error("Empty response from AI");
  } catch (error) {
    console.error("Gemini Itinerary Error:", error);
    // Fallback basic itinerary
    return {
      title: "Essential Mysore Heritage Route",
      items: [
        { time: "07:00 AM", activity: "Heritage Walk in Agrahara", location: "Agrahara Circle", notes: "Experience the old world charm and traditional breakfast.", isSustainable: true },
        { time: "10:00 AM", activity: "Rosewood Inlay Workshop", location: "Tilak Nagar", notes: "Meet master craftsman Nanjundaiah.", isSustainable: true }
      ],
      seasonalGuidelines: ["Carry an umbrella for unexpected afternoon showers."],
      safetyTips: ["Ensure you have verified direct artisan contacts."]
    };
  }
};

export const searchHiddenGems = async (query: string, userLocation?: {lat: number, lng: number}): Promise<{text: string, chunks: any[]}> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    // Maps grounding is strictly supported in Gemini 2.5 series
    const model = "gemini-2.5-flash";
    
    const prompt = `
      Search for authentic, non-touristy, hidden gems or local artisans in Mysuru district, Karnataka related to: "${query}". 
      Focus on specific locations with historical or cultural value. 
      Format your response in friendly Markdown. 
      IF user location is provided, find spots nearby that location.
    `;

    // Tool configuration for Maps Grounding
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
      text: "Connection to Heritage Database interrupted. Please explore our curated gems list manually.", 
      chunks: [] 
    };
  }
};