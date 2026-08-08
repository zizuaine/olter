import { ai } from "../config/genai.js";
import type { ChatMessage } from "../services/semanticSearch.js";

export const genResponse = async (query: string, context: string, chat: ChatMessage[]) => {

    const history = chat.map(message => ({
        role: message.role,
        parts: [{ text: message.content }]
    }))
    console.log(history)

    const systemPrompt = `You are a personal knowledge assistant for a Second Brain app.

    The user has saved various content — articles, YouTube videos, PDFs, and notes — to their personal knowledge base.

    Your job is to answer the user's questions using ONLY the context provided below.

    Rules:
    - Answer based strictly on the provided context
    - If the context contains relevant information, use it to give a detailed answer
    - Be conversational and helpful
    - If the context is genuinely empty or irrelevant, only then say you couldn't find anything

    Context from user's saved content:
    ${context}`;

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: [
            ...history,
            {
                role: "user",
                parts: [{ text: query }]
            }
        ],
        config: {
            systemInstruction: systemPrompt
        }
    });

    return { answer: response.text };
}