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
 * Generates a sustainable itinerary using Gemini 3
 */
export const generateSustainableItinerary = async (
  days: number,
  interests: string[],
  groupType: string
): Promise<Itinerary> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY missing from environment");
    throw new Error("Configuration Error");
  }

  const ai = new GoogleGenAI({ apiKey });
  // Use gemini-3-flash-preview for structured text tasks
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

    const text = response.text;
    if (text) {
      return JSON.parse(extractJson(text)) as Itinerary;
    }
    throw new Error("No text in response");
  } catch (error) {
    console.error("Itinerary Generation Failed:", error);
    // Reliable fallback for immediate UX
    return {
      title: "Essential Mysuru Heritage (Fallback Mode)",
      items: [
        { time: "06:30 AM", activity: "Yoga at Gokulam", location: "Gokulam 3rd Stage", notes: "Experience Mysore's world-famous Ashtanga heritage.", isSustainable: true },
        { time: "09:00 AM", activity: "Mylari Breakfast", location: "Nazarbad", notes: "A zero-waste local culinary institution.", isSustainable: true },
        { time: "11:00 AM", activity: "Inlay Workshop Visit", location: "Tilak Nagar", notes: "Support master craftsmen directly.", isSustainable: true }
      ],
      seasonalGuidelines: ["Stay hydrated between 12 PM - 3 PM."],
      safetyTips: ["Always verify artisan availability via phone first."]
    };
  }
};

/**
 * Searches for hidden gems using Maps Grounding on Gemini 2.5
 */
export const searchHiddenGems = async (query: string, userLocation?: {lat: number, lng: number}): Promise<{text: string, chunks: any[]}> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return { text: "Search requires an active API configuration.", chunks: [] };
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    // Use gemini-2.5-flash for Maps Grounding tasks
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
      text: response.text || "No results found for that heritage query.",
      chunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    console.error("Grounding Search Failed:", error);
    return { 
      text: "Our heritage database is currently processing high traffic. Please browse the curated list below.", 
      chunks: [] 
    };
  }
};