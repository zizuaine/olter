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

    const systemPrompt = `
You are a personal knowledge assistant for a Second Brain app.

The user has saved various content such as articles, YouTube videos, PDFs, and notes.

Answer the user's question using ONLY the context provided below.

Rules:
- Use only information present in the provided context.
- Do not use your general knowledge.
- Do not guess or make up information.
- First determine whether the context is actually relevant to the user's question.
- If the context is relevant, answer the question using that information.
- If the context is empty or unrelated to the question, say:
  "I couldn't find anything about that in your saved content."
- Never answer using information that is not present in the context.

Context:
${context}
`;

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