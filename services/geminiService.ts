
import { GoogleGenAI, Type } from "@google/genai";
import { ICDResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Cleans the string returned by the model to ensure it's valid JSON.
 * Models often wrap JSON in markdown code blocks like ```json ... ```
 */
const cleanJsonResponse = (text: string): string => {
  return text.replace(/```json/g, "").replace(/```/g, "").trim();
};

export const getICDMapping = async (diagnosisText: string): Promise<ICDResponse> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Map the following medical diagnosis to ICD-10 and ICD-11 codes. 
      Diagnosis: "${diagnosisText}"
      
      Provide accurate codes and clear titles. Include a reasoning field explaining the mapping.
      Output ONLY a JSON object.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            icd10: {
              type: Type.OBJECT,
              properties: {
                code: { type: Type.STRING },
                title: { type: Type.STRING },
                confidence: { type: Type.NUMBER }
              },
              required: ['code', 'title', 'confidence']
            },
            icd11: {
              type: Type.OBJECT,
              properties: {
                code: { type: Type.STRING },
                title: { type: Type.STRING },
                confidence: { type: Type.NUMBER }
              },
              required: ['code', 'title', 'confidence']
            },
            confidence_score: { type: Type.NUMBER },
            reasoning: { type: Type.STRING }
          },
          required: ['icd10', 'icd11', 'confidence_score', 'reasoning']
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    
    const cleanedText = cleanJsonResponse(text);
    return JSON.parse(cleanedText) as ICDResponse;
  } catch (err) {
    console.error("Gemini ICD Mapping Error:", err);
    throw new Error("Diagnostic mapping failed. Please try again with a clearer diagnosis.");
  }
};
