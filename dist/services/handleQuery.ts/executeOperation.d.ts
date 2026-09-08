import type { QueryIntent } from "./queryResolver.js";
import type { HydratedDocument } from "mongoose";
import type { Chat } from "../../models/chat.js";
type ResolvedContent = {
    context?: string;
    batches?: string[][];
    contentIds: string[];
};
export declare const executeOperation: (intent: QueryIntent, query: string, resolvedContent: ResolvedContent, chat: HydratedDocument<Chat>, user: string) => Promise<{
    message: string;
    answer: string;
    chatId: any;
} | {
    questions: {
        questionNumber: number;
        question: string;
        options: string[];
        correctAnswer: string;
        explanation: string;
    }[];
} | import("../handleActions.js").SummaryResult | {
    question: string;
    answer: string;
}[] | {
    quizId: import("mongoose").Types.ObjectId;
    questions: import("mongoose").Types.DocumentArray<{
        options: string[];
        questionNumber: number;
        question: string;
        correctAnswer: string;
        explanation: string;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        options: string[];
        questionNumber: number;
        question: string;
        correctAnswer: string;
        explanation: string;
    }, {}, {}> & {
        options: string[];
        questionNumber: number;
        question: string;
        correctAnswer: string;
        explanation: string;
    }>;
} | null | undefined>;
export {};
//# sourceMappingURL=executeOperation.d.ts.map