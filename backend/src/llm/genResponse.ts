import { groq } from "../config/groq.js";

type ChatMessage = {
    role: "user" | "assistant",
    content: string
}

export const genResponse = async (query: string, context: string, chat: ChatMessage[]) => {

    const history = chat.map(message => ({
        role: message.role,
        content: message.content
    }));

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

    const response = await groq.chat.completions.create({
        model: "openai/gpt-oss-120b",
        messages: [
            { role: "system", content: systemPrompt },
            ...history,
            { role: "user", content: query }
        ]
    });

    return { content: response.choices[0]?.message?.content ?? "" };
}