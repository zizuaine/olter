export declare const deleteContentsService: (user: string, id: string) => Promise<(import("mongoose").Document<unknown, {}, {
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
}) | null>;
//# sourceMappingURL=deleteContent.d.ts.map