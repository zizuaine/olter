
export const genResponseSchema = {
    type: "object",
    properties: {
        answer: {
            type: "string"
        },
        found: {
            type: "boolean"
        }
    },
    required: ["answer", "found"],
    additionalProperties: false
};