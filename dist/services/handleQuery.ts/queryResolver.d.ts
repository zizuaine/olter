import type { Chat } from "../../models/chat.js";
import type { HydratedDocument } from "mongoose";
export type QueryIntent = {
    operation: "answer" | "quiz" | "flashcard" | "summary" | "none";
    target: "specific" | "topic" | "active" | "none";
    scope: "relevant" | "full" | "null";
    contentQuery: string | null;
};
export declare const queryResolver: (query: string, chat: HydratedDocument<Chat>) => Promise<QueryIntent>;
//# sourceMappingURL=queryResolver.d.ts.map