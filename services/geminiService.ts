
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

const handleApiError = (error: any) => {
  console.error("Gemini API Error:", error);
};

/**
 * Generates a high-quality sustainable itinerary.
 * Using gemini-3-flash-preview for speed and reliability.
 */
export const generateSustainableItinerary = async (
  days: number,
  interests: string[],
  groupType: string
): Promise<Itinerary> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
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

    if (response.text) {
      const parsed = JSON.parse(extractJson(response.text));
      return parsed as Itinerary;
    }
    throw new Error("Empty response");
  } catch (error) {
    handleApiError(error);
    return {
      title: "The Artisan Heritage Trail (Recovery Mode)",
      items: [
        { 
          time: "09:00 AM", 
          duration: "3 Hours",
          category: "artisan",
          activity: "Rosewood Inlay Studio Tour", 
          location: "Tilak Nagar", 
          notes: "Visit the master craftsman studios for an authentic look at Mysuru's hereditary art.", 
          isSustainable: true,
          impactReason: "Direct support to local artisan families."
        }
      ],
      seasonalGuidelines: ["Check local studio timings."],
      safetyTips: ["Ask for permission before taking photos of intricate designs."]
    };
  }
};

/**
 * Searches for hidden gems using Google Search Grounding.
 */
export const searchHiddenGems = async (query: string): Promise<{text: string, chunks: any[]}> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
    const model = "gemini-3-flash-preview"; 
    
    const systemInstruction = `
      You are a Mysuru Heritage Expert. 
      Only search for "Hidden Gems" or decentralized spots in and around Mysore. 
      Provide specific descriptions, history, and why it is a gem.
      Include website or map references if found.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: [{ parts: [{ text: query }] }],
      config: {
        systemInstruction,
        temperature: 0.2,
        tools: [{ googleSearch: {} }],
      }
    });

    return {
      text: response.text || "I couldn't find specific heritage data for that query.",
      chunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    handleApiError(error);
    return { 
      text: "The heritage database is currently unavailable. Please try searching for 'Rosewood inlay Agrahara' or 'Blue Lagoon Mysore'.", 
      chunks: [] 
    };
  }
};
