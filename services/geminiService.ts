
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
 * Heritage Grounding Search
 * Uses Gemini 3 Pro and Google Search to find verified Mysuru heritage information.
 */
export const searchHiddenGems = async (query: string): Promise<{text: string, chunks: any[]}> => {
  try {
    // Guidelines: Always create a fresh instance with the named parameter
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const model = "gemini-3-pro-preview"; // Using Pro for better tool utilization
    
    const systemInstruction = `
      You are a specialized "Mysuru Heritage Architect". 
      Your mission is to find authentic, decentralized, and hidden tourism spots in Mysore.
      
      STRICT OPERATING RULES:
      1. USE the googleSearch tool for every request to find real-time status and locations.
      2. FOCUS on spots outside the Mysore Palace main grounds.
      3. INCLUDE specific neighborhood details (e.g., "Mandi Mohalla", "Agrahara", "Vontikoppal").
      4. If searching for an artisan, try to find their actual studio location or collective name.
      5. Provide an evocative, professional description of why the spot is a "gem".
    `;

    const response = await ai.models.generateContent({
      model,
      contents: `Perform a deep search for this Mysore heritage/hidden gem detail: ${query}`,
      config: {
        systemInstruction,
        temperature: 0.2,
        tools: [{ googleSearch: {} }],
      }
    });

    const text = response.text || "I couldn't generate a description, but check the sources below.";
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    return { text, chunks };
  } catch (error) {
    console.error("AI Search Error:", error);
    throw error;
  }
};

/**
 * Generates a high-quality sustainable itinerary.
 */
export const generateSustainableItinerary = async (
  days: number,
  interests: string[],
  groupType: string
): Promise<Itinerary> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const model = "gemini-3-flash-preview"; 
    
    const systemInstruction = `
      You are the "Mysuru Heritage Architect". Your goal is to decentralize tourism away from the Mysore Palace.
      
      RULES:
      1. NO malls or international chains.
      2. MANDATORY inclusion of artisan hubs: Tilak Nagar (Rosewood), Agrahara (Silk), Mandi Mohalla (Food).
      3. Suggest hidden gems like Blue Lagoon or Venugopala Swamy Temple.
      4. Return results in strict JSON format.
    `;

    const userPrompt = `Create a detailed ${days}-day plan for a ${groupType}. Interests: ${interests.join(', ')}.`;

    const response = await ai.models.generateContent({
      model,
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.1,
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

    const parsed = JSON.parse(extractJson(response.text || "{}"));
    return parsed as Itinerary;
  } catch (error) {
    console.error("Itinerary Error:", error);
    return {
      title: "Artisan Discovery Route",
      items: [
        { 
          time: "09:30 AM", 
          duration: "3 Hours",
          category: "artisan",
          activity: "Rosewood Inlay Studio Tour", 
          location: "Tilak Nagar", 
          notes: "Visit the masters of Mysuru's hereditary rosewood craft.", 
          isSustainable: true,
          impactReason: "Direct support to artisan families."
        }
      ]
    };
  }
};
