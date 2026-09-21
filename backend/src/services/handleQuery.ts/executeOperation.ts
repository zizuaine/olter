import { handleRagResponse } from "../handleRagResponse.js";
import { handleActionResponse, type FlashcardResult, type QuizResult } from "../handleActions.js";
import type { QueryIntent } from "./queryResolver.js";
import type { HydratedDocument, ObjectId } from "mongoose";
import type { Chat } from "../../models/chat.js";
import { processSummaryBatches } from "../../llm/processSummBatches.js";
import { contentModel, type Content } from "../../models/contents.js";

type ResolvedContent = {
    context?: string;
    batches?: string[][];
    contentIds: string[];
    sources?: Content[];
    content?: string
}

type ExecuteResponse =
    | {
        operation: "answer";
        content: string;
        found: boolean;
    }
    | {
        operation: "summary";
        content: string;
    }
    | {
        operation: "flashcard";
        flashcards: FlashcardResult["flashcards"];
    }
    | {
        operation: "quiz";
        quizId: string;
        questions: QuizResult["questions"];
    };

export const executeOperation = async (
    intent: QueryIntent,
    query: string,
    resolvedContent: ResolvedContent,
    chat: HydratedDocument<Chat>,
    user: string
): Promise<ExecuteResponse> => {

    const { batches, context, contentIds } = resolvedContent;

    if (intent.operation === "none") {
        throw new Error("Cannot execute a 'none' operation");
    }

    if (intent.operation === "summary") {

        if (batches && batches?.length > 0) {
            console.log("Number of batches:", batches.length);
            const batchSummaries = await processSummaryBatches(batches);
            console.log("Batch summaries:", batchSummaries.length);
            const summaryContext = batchSummaries.map(s => s.summary).join("\n\n--\n\n")
            return handleActionResponse("summary", summaryContext, contentIds, user, chat._id.toString());
        };

        return handleActionResponse(
            "summary",
            context ?? "",
            contentIds,
            user,
            chat._id.toString()
        );
    }

    if (intent.operation === "flashcard" || intent.operation === "quiz") {
        if (!context) {
            throw new Error("No relevant context found for this operation");
        }
        return handleActionResponse(
            intent.operation,
            context,
            contentIds,
            user,
            chat._id.toString()
        );
    }

    if (intent.operation === "answer") {
        if (!context) {
            throw new Error("No relevant context found for this operation");
        }
        return handleRagResponse(
            query,
            user,
            context,
            contentIds,
            chat
        );
    }
    throw new Error(`Unsupported operation: ${intent.operation}`);
}
