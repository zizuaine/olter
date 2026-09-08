import type { QueryIntent } from "./queryResolver.js";
import { type Chat } from "../../models/chat.js";
import type { HydratedDocument } from "mongoose";
export declare const contentResolver: (intent: QueryIntent, chat: HydratedDocument<Chat>, query: string, user: string) => Promise<{
    context: string;
    contentIds: string[];
    batches?: never;
    sources?: never;
} | {
    batches: string[][];
    contentIds: string[];
    context?: never;
    sources?: never;
} | {
    context: string;
    contentIds: string[];
    sources: (import("mongoose").Document<unknown, {}, {
        tags: string[];
        topics: string[];
        userId: import("mongoose").Types.ObjectId;
        content: string;
        embeddingStatus: "pending" | "processing" | "completed" | "failed";
        chunkIds: string[];
        type?: "link" | "note" | "pdf" | "youtube" | null;
        link?: string | null;
        title?: string | null;
        summary?: string | null;
        sitename?: string | null;
        brainId?: import("mongoose").Types.ObjectId | null;
    } & import("mongoose").DefaultTimestampProps, {}, import("mongoose").DefaultSchemaOptions> & {
        tags: string[];
        topics: string[];
        userId: import("mongoose").Types.ObjectId;
        content: string;
        embeddingStatus: "pending" | "processing" | "completed" | "failed";
        chunkIds: string[];
        type?: "link" | "note" | "pdf" | "youtube" | null;
        link?: string | null;
        title?: string | null;
        summary?: string | null;
        sitename?: string | null;
        brainId?: import("mongoose").Types.ObjectId | null;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[];
    batches?: never;
} | null>;
//# sourceMappingURL=contentResolver.d.ts.map