export declare const semanticSearch: (query: string, user: string, brainId: string | null) => Promise<{
    context: string;
    sources: never[];
    matches?: never;
} | {
    context: string;
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
    matches: import("@pinecone-database/pinecone").ScoredPineconeRecord<import("@pinecone-database/pinecone").RecordMetadata>[];
}>;
//# sourceMappingURL=semanticSearch.d.ts.map