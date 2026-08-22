export const summarySchema: Record<string, unknown> = {
    type: "object",
    properties: {
        summary: { type: "string" }
    },
    required: ["summary"],
    additionalProperties: false
};