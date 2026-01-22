
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
 * Heritage Grounding Search - Optimized for SPEED
 */
export const searchHiddenGems = async (query: string): Promise<{text: string, chunks: any[]}> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    // Use Flash for maximum speed
    const model = "gemini-3-flash-preview"; 
    
    const response = await ai.models.generateContent({
      model,
      contents: `Search for this Mysore heritage gem or artisan: ${query}. Provide a fast, concise summary.`,
      config: {
        systemInstruction: "You are a fast Mysore heritage guide. Use googleSearch for real-time accuracy. Focus on hidden spots away from the palace.",
        temperature: 0.1, // Faster sampling
        thinkingConfig: { thinkingBudget: 0 }, // Disable thinking for lowest latency
        tools: [{ googleSearch: {} }],
      }
    });

    return {
      text: response.text || "Information found. See links below.",
      chunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    console.error("Fast Search Error:", error);
    throw error;
  }
};

/**
 * Generates a high-quality sustainable itinerary - Optimized for SPEED
 */
export const generateSustainableItinerary = async (
  days: number,
  interests: string[],
  groupType: string
): Promise<Itinerary> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
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
  } catch (error) {
    console.error("Itinerary Error:", error);
    return {
      title: "Quick Artisan Route",
      items: [{ time: "10:00 AM", activity: "Rosewood Workshop", location: "Tilak Nagar", notes: "Direct artisan visit.", isSustainable: true, category: "artisan" }]
    };
  }
};
