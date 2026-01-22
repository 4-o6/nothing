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
 * Uses Google Search to find verified Mysuru heritage information.
 */
export const searchHiddenGems = async (query: string): Promise<{text: string, chunks: any[]}> => {
  try {
    // Fresh client instance for every call
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
    const model = "gemini-3-flash-preview"; 
    
    const systemInstruction = `
      You are a World-Class Mysuru Heritage Expert and Sustainable Tourism Architect.
      
      GOAL: Help travelers find high-quality, authentic, and decentralized spots in Mysore.
      
      GUIDELINES:
      - Focus on hidden gems, artisan studios, and silent heritage sites.
      - Discourage overcrowded areas (like the main Palace grounds at noon).
      - Provide historical context and sensory details.
      - ALWAYS include specific neighborhood names (e.g., Agrahara, Tilak Nagar, Mandi Mohalla).
      - Be concise but evocative.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: [{ parts: [{ text: `Search and describe this heritage spot or artisan craft in Mysore: ${query}` }] }],
      config: {
        systemInstruction,
        temperature: 0.1, // High precision
        tools: [{ googleSearch: {} }],
      }
    });

    return {
      text: response.text || "No descriptive data found for this specific query.",
      chunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    console.error("Gemini Search Error:", error);
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
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
    const model = "gemini-3-flash-preview"; 
    
    const systemInstruction = `
      You are the "Mysuru Heritage Architect". Your goal is to decentralize tourism away from the Mysore Palace.
      
      STRICT RULES:
      1. NO generic malls or international food chains.
      2. MANDATORY inclusion of specific artisan hubs: Tilak Nagar (Rosewood), Agrahara (Silk), Mandi Mohalla (Food).
      3. Suggest hidden natural gems like Blue Lagoon or Venugopala Swamy Temple.
      4. Return results in strict JSON format matching the schema.
    `;

    const userPrompt = `Create a ${days}-day plan for a ${groupType}. Interests: ${interests.join(', ')}.`;

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
    console.error("Gemini Itinerary Error:", error);
    return {
      title: "Artisan Heritage Trail (Manual Mode)",
      items: [
        { 
          time: "09:00 AM", 
          duration: "3 Hours",
          category: "artisan",
          activity: "Rosewood Inlay Studio Visit", 
          location: "Tilak Nagar", 
          notes: "Visit master craftsmen and support hereditary art forms directly.", 
          isSustainable: true,
          impactReason: "Direct support to local families."
        }
      ],
      seasonalGuidelines: ["Check local studio timings."],
      safetyTips: ["Ask permission before photography."]
    };
  }
};