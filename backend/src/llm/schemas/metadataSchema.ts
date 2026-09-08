export const metadataSchema: Record<string, unknown> = {
    type: "object",
    properties: {
        title: { type: "string" },
        summary: { type: "string" },
        tags: {
            type: "array",
            items: { type: "string" }
        },
        topics: {
            type: "array",
            items: { type: "string" }
        }
    },
    required: ["title", "summary", "tags", "topics"],
    additionalProperties: false
};