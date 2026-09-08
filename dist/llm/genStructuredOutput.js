import { groq } from "../config/groq.js";
export const genStructuredOutput = async (operationConfig, context) => {
    console.log({
        promptChars: operationConfig.prompt.length,
        contextChars: context.length,
        maxCompletionTokens: 2000,
    });
    const response = await groq.chat.completions.create({
        model: "openai/gpt-oss-120b",
        temperature: 0,
        max_completion_tokens: 2000,
        messages: [
            { role: "system", content: operationConfig.prompt },
            { role: "user", content: context }
        ],
        response_format: {
            type: "json_schema",
            json_schema: {
                name: "response",
                schema: operationConfig.schema,
                strict: true
            }
        }
    });
    const text = response.choices[0]?.message?.content;
    if (!text) {
        throw new Error("No response generated");
    }
    console.log(text);
    return JSON.parse(text);
};
//# sourceMappingURL=genStructuredOutput.js.map