import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();
if (!process.env.GEMINI_API_KEY) {
    throw new Error("genAI api key not provided");
}
export const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});
//# sourceMappingURL=genai.js.map