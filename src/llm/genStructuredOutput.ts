import { ai } from "../config/genai.js";
import type { Schema } from "@google/genai";

interface OperationConfig {
    prompt: string,
    schema: Schema
}
export const genStructuredOutput = async <T>(operationConfig: OperationConfig, context: string): Promise<T> => {
    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: context,
        config: {
            systemInstruction: operationConfig.prompt,
            responseSchema: operationConfig.schema
        }
    })
    const text = response.text;

    if (!text) {
        throw new Error("No response generated");
    }

    return JSON.parse(text) as T;;
}
