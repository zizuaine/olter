import { Batches } from "groq-sdk/resources";
import { genStructuredOutput } from "./genStructuredOutput.js";
import { summaryPrompt } from "./prompts/summary.js";
import { summarySchema } from "./schemas/summary.js";
export const processSummaryBatches = async (batches, concurrency = 2) => {
    const result = [];
    for (let i = 0; i < batches.length; i += concurrency) {
        const currentBatches = batches.slice(i, i + 2);
        const batchResult = await Promise.all(currentBatches.map(batch => {
            const context = batch.join("\n\n---\n\n");
            return genStructuredOutput({ prompt: summaryPrompt, schema: summarySchema }, context);
        }));
        result.push(...batchResult);
    }
    return result;
};
//# sourceMappingURL=processSummBatches.js.map