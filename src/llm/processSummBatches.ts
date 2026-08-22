import { Batches } from "groq-sdk/resources"
import { genStructuredOutput } from "./genStructuredOutput.js";
import { summaryPrompt } from "./prompts/summary.js";
import { summarySchema } from "./schemas/summary.js";
import type { SummaryResult } from "../services/handleActions.js";


export const processSummaryBatches = async (batches: string[][], concurrency: number = 2) => {
    const result: SummaryResult[] = []

    for (let i = 0; i < batches.length; i += concurrency) {
        const currentBatches = batches.slice(i, i + 2);
        const batchResult = await Promise.all(
            currentBatches.map(batch => {
                const context = batch.join("\n\n---\n\n");
                return genStructuredOutput<SummaryResult>(
                    { prompt: summaryPrompt, schema: summarySchema },
                    context)
            })
        )
        result.push(...batchResult)
    }
    return result;
}