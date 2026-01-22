
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
 * Validates the existence of the API Key
 */
const getAIClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey || apiKey === "") {
    console.error("CRITICAL: API_KEY is missing from the environment. Search will not work.");
    throw new Error("MISSING_API_KEY");
  }
  return new GoogleGenAI({ apiKey });
};

/**
 * Heritage Grounding Search - Optimized for SPEED & Reliability
 */
export const searchHiddenGems = async (query: string): Promise<{text: string, chunks: any[]}> => {
  try {
    const ai = getAIClient();
    const model = "gemini-3-flash-preview"; 
    
    const response = await ai.models.generateContent({
      model,
      contents: `Search for this Mysore heritage gem or artisan: ${query}. Provide a fast, concise summary.`,
      config: {
        systemInstruction: "You are a fast Mysore heritage guide. Use googleSearch for real-time accuracy. Focus on hidden spots away from the palace.",
        temperature: 0.1,
        thinkingConfig: { thinkingBudget: 0 },
        tools: [{ googleSearch: {} }],
      }
    });

    if (!response.text && !response.candidates?.[0]?.groundingMetadata?.groundingChunks) {
      throw new Error("EMPTY_RESPONSE");
    }

    return {
      text: response.text || "Information found. See links below.",
      chunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error: any) {
    console.error("Heritage Search Error:", error);
    // Rethrow specific errors to be caught by the UI
    if (error.message === "MISSING_API_KEY") throw error;
    throw new Error("API_COMMUNICATION_FAILED");
  }
};

/**
 * Generates a high-quality sustainable itinerary
 */
export const generateSustainableItinerary = async (
  days: number,
  interests: string[],
  groupType: string
): Promise<Itinerary> => {
  try {
    const ai = getAIClient();
    const model = "gemini-3-flash-preview"; 
    
    const response = await ai.models.generateContent({
      model,
      contents: `Create a ${days}-day plan for ${groupType} interested in ${interests.join(', ')} in Mysore.`,
      config: {
        systemInstruction: "You are the Mysuru Heritage Architect. Return a sustainable, decentralized travel plan in JSON. Include artisans in Tilak Nagar/Agrahara.",
        temperature: 0.1,
        thinkingConfig: { thinkingBudget: 0 },
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
                  category: { type: Type.STRING },
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

    return JSON.parse(extractJson(response.text || "{}")) as Itinerary;
  } catch (error: any) {
    console.error("Itinerary Generation Error:", error);
    if (error.message === "MISSING_API_KEY") throw error;
    // Return a static fallback if the API fails
    return {
      title: "Quick Artisan Route (Offline)",
      items: [{ time: "10:00 AM", activity: "Rosewood Workshop", location: "Tilak Nagar", notes: "Direct artisan visit. (AI Service currently unavailable)", isSustainable: true, category: "artisan" }]
    };
  }
};
