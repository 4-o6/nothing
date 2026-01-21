import { GoogleGenAI, Type } from "@google/genai";
import { Itinerary } from "../types";

const extractJson = (text: string): string => {
  try {
    const jsonMatch = text.match(/```json\n?([\s\S]*?)\n?```/) || text.match(/\{[\s\S]*\}/);
    const cleaned = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : text;
    return cleaned.trim();
  } catch (e) {
    return text;
  }
};

const getActiveApiKey = async (): Promise<string> => {
  const envKey = process.env.API_KEY;
  if (envKey && envKey.length > 10) return envKey;

  const aistudio = (window as any).aistudio;
  if (aistudio) {
    const hasKey = await aistudio.hasSelectedApiKey();
    if (!hasKey) {
      await aistudio.openSelectKey();
    }
  }
  return process.env.API_KEY || "";
};

const handleApiError = (error: any) => {
  console.error("Gemini API Error:", error);
  if (error?.message?.includes("API key not valid") || error?.message?.includes("Requested entity was not found")) {
    if (typeof window !== 'undefined' && (window as any).aistudio?.openSelectKey) {
      (window as any).aistudio.openSelectKey();
    }
  }
};

export const generateSustainableItinerary = async (
  days: number,
  interests: string[],
  groupType: string
): Promise<Itinerary> => {
  try {
    const apiKey = await getActiveApiKey();
    const ai = new GoogleGenAI({ apiKey });
    const model = "gemini-3-pro-preview"; 
    
    const prompt = `
      Create a high-quality, authentic ${days}-day sustainable travel itinerary for Mysore (Mysuru), India.
      Target Audience: ${groupType}
      Core Interests: ${interests.join(', ')}
      
      MANDATORY DECENTRALIZATION RULES:
      - AVOID: Generic malls, commercial food chains, or standard crowded palace timings (11am-4pm).
      - FOCUS: "Living Museum" heritage. Suggest specific districts: Agrahara (weavers), Tilak Nagar (inlay artisans), Gokulam (yoga/slow life), and Mandi Mohalla (heritage culinary).
      - ARTISANS: Suggest specific activities like "Watch Ganjifa art creation" or "Visit a silk weaver's home loom".
      - HIDDEN GEMS: Include spots like Venugopala Swamy Temple (KRS backwaters), Blue Lagoon, or heritage Agrahara walks.
      - SUSTAINABILITY: Explain WHY an activity is sustainable (e.g., direct support to craft, low carbon footprint).
      
      RESPONSE FORMAT: Strict JSON only.
    `;

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
                  duration: { type: Type.STRING, description: "Estimated time to spend, e.g., '2 Hours'" },
                  category: { type: Type.STRING, description: "One of: artisan, food, nature, culture, relaxation" },
                  activity: { type: Type.STRING },
                  location: { type: Type.STRING },
                  notes: { type: Type.STRING },
                  isSustainable: { type: Type.BOOLEAN },
                  impactReason: { type: Type.STRING, description: "Brief explanation of how this helps local communities" }
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
      return JSON.parse(extractJson(response.text)) as Itinerary;
    }
    throw new Error("Empty response");
  } catch (error) {
    handleApiError(error);
    // Enhanced Fallback with more detail
    return {
      title: "Agrahara & Artisan Heritage Trail",
      items: [
        { 
          time: "06:30 AM", 
          duration: "2 Hours",
          category: "culture",
          activity: "Heritage Yoga at Gokulam", 
          location: "Gokulam 3rd Stage", 
          notes: "Visit a traditional Shala to witness the world-famous Ashtanga heritage without commercial interference.", 
          isSustainable: true,
          impactReason: "Supports the traditional Guru-Shishya parampara of Mysuru."
        },
        { 
          time: "09:30 AM", 
          duration: "1 Hour",
          category: "food",
          activity: "Traditional Breakfast at Mylari", 
          location: "Nazarbad", 
          notes: "Eat at a century-old, family-run institution that uses traditional recipes and local sourcing.", 
          isSustainable: true,
          impactReason: "Zero-waste cooking practices and supporting local food heritage."
        },
        { 
          time: "11:30 AM", 
          duration: "2.5 Hours",
          category: "artisan",
          activity: "Rosewood Inlay Home-Studio Visit", 
          location: "Tilak Nagar", 
          notes: "Visit master craftsmen like Nanjundaiah to see the rhythmic tapping of wood inlay creation.", 
          isSustainable: true,
          impactReason: "Direct financial support to artisan families without middlemen."
        }
      ],
      seasonalGuidelines: ["Check for local festival dates which may change artisan availability."],
      safetyTips: ["Always ask permission before photographing independent artisans."]
    };
  }
};

export const searchHiddenGems = async (query: string, userLocation?: {lat: number, lng: number}): Promise<{text: string, chunks: any[]}> => {
  try {
    const apiKey = await getActiveApiKey();
    const ai = new GoogleGenAI({ apiKey });
    const model = "gemini-2.5-flash"; 
    
    const prompt = `
      Identify authentic, off-the-beaten-path cultural spots or local artisan studios in Mysore for: "${query}".
      Explain the heritage value of each. Focus on decentralization: places away from the main Palace gates.
    `;

    const config: any = {
      tools: [{ googleMaps: {} }, { googleSearch: {} }],
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
      text: response.text || "No hidden gems matched your search.",
      chunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    handleApiError(error);
    return { 
      text: "Heritage network connection is active but searching. Please refine your query or refresh.", 
      chunks: [] 
    };
  }
};