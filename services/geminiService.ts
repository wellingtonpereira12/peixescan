import { GoogleGenAI, Type, Schema } from "@google/genai";
import { FishAnalysis } from "../types";

const processBase64 = (base64String: string): string => {
  // Removes the data:image/xxx;base64, prefix if present
  const base64Data = base64String.split(',')[1];
  return base64Data || base64String;
};

const fishSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    name: {
      type: Type.STRING,
      description: "Nome comum do peixe em Português.",
    },
    scientificName: {
      type: Type.STRING,
      description: "Nome científico da espécie.",
    },
    confidence: {
      type: Type.NUMBER,
      description: "Nível de confiança na identificação de 0 a 100.",
    },
    habitat: {
      type: Type.STRING,
      description: "Onde este peixe costuma viver (água doce, salgada, recifes, rios, etc).",
    },
    diet: {
      type: Type.STRING,
      description: "O que este peixe come (carnívoro, herbívoro, onívoro).",
    },
    description: {
      type: Type.STRING,
      description: "Uma breve descrição física e comportamental do peixe.",
    },
    edible: {
      type: Type.BOOLEAN,
      description: "Se o peixe é considerado comestível para humanos.",
    },
    conservationStatus: {
      type: Type.STRING,
      description: "Estado de conservação (ex: Pouco Preocupante, Vulnerável, Extinto).",
    },
    cookingTips: {
      type: Type.STRING,
      description: "Dicas rápidas de culinária se for comestível, ou aviso se for tóxico.",
    },
  },
  required: ["name", "scientificName", "confidence", "habitat", "description", "edible"],
};

export const identifyFish = async (base64Image: string): Promise<FishAnalysis> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const cleanBase64 = processBase64(base64Image);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg", // Assuming generic image type, Gemini handles most well
              data: cleanBase64,
            },
          },
          {
            text: "Analise esta imagem. Se for um peixe, identifique a espécie e forneça detalhes em Português. Se a imagem não contiver um peixe claro, retorne dados indicando que não foi possível identificar com confiança baixa.",
          },
        ],
      },
      config: {
        systemInstruction: "Você é um biólogo marinho especialista e chef de cozinha. Seu objetivo é identificar peixes para pescadores e entusiastas.",
        responseMimeType: "application/json",
        responseSchema: fishSchema,
        temperature: 0.4, // Lower temperature for more factual results
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }

    return JSON.parse(text) as FishAnalysis;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};