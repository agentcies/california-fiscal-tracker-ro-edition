
import { GoogleGenAI, Type } from "@google/genai";
import { SyncResult, AISearchResult, GroundingSource } from "../types";
import { APP_CONFIG } from "../constants";

export const performAISearch = async (query: string): Promise<AISearchResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  try {
    const response = await ai.models.generateContent({
      model: APP_CONFIG.model,
      contents: query,
      config: {
        systemInstruction: APP_CONFIG.systemInstruction,
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "No analysis available.";
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    const sources: GroundingSource[] = chunks
      .filter((chunk: any) => chunk.web)
      .map((chunk: any) => ({
        title: chunk.web.title || "Source",
        uri: chunk.web.uri,
      }));

    return { text, sources };
  } catch (error) {
    console.error("AI Search Error:", error);
    return { text: "Error fetching live data.", sources: [] };
  }
};

export const syncFiscalData = async (): Promise<SyncResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `Perform a comprehensive search for the following:
  1. Latest status of the 5% California wealth tax ballot measure (retroactive to Jan 1, 2026).
  2. News on Ro Khanna's late Dec 2025 - Jan 2026 posts defending the tax.
  3. Relocation updates for Peter Thiel, Larry Page, Chamath Palihapitiya, and David Sacks.
  4. Current status of the $45B Medicaid gap in CA.
  5. Any additional billionaires reported to have exited in 2025.
  
  Return a structured analysis summarizing these fiscal tensions.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        systemInstruction: `You are a data extraction agent. Extract numerical fiscal data and relocation statuses. 
        Focus on the "5% wealth tax" impact and the $45B Medicaid funding pressure.`,
        tools: [{ googleSearch: {} }],
        thinkingConfig: { thinkingBudget: 5000 }
      },
    });

    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources: GroundingSource[] = chunks
      .filter((chunk: any) => chunk.web)
      .map((chunk: any) => ({
        title: chunk.web.title || "Source",
        uri: chunk.web.uri,
      }));

    return {
      migrationUpdates: [],
      billionaireUpdates: [],
      analysis: response.text || "Sync completed with no new data points found.",
      sources
    };
  } catch (error) {
    console.error("Sync Error:", error);
    throw error;
  }
};
