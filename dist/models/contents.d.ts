import mongoose from "mongoose";
import type { InferSchemaType } from "mongoose";
declare const contentsSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    tags: string[];
    topics: string[];
    userId: mongoose.Types.ObjectId;
    content: string;
    embeddingStatus: "pending" | "processing" | "completed" | "failed";
    chunkIds: string[];
    type?: "link" | "note" | "pdf" | "youtube" | null;
    link?: string | null;
    title?: string | null;
    summary?: string | null;
    sitename?: string | null;
    brainId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    tags: string[];
    topics: string[];
    userId: mongoose.Types.ObjectId;
    content: string;
    embeddingStatus: "pending" | "processing" | "completed" | "failed";
    chunkIds: string[];
    type?: "link" | "note" | "pdf" | "youtube" | null;
    link?: string | null;
    title?: string | null;
    summary?: string | null;
    sitename?: string | null;
    brainId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    tags: string[];
    topics: string[];
    userId: mongoose.Types.ObjectId;
    content: string;
    embeddingStatus: "pending" | "processing" | "completed" | "failed";
    chunkIds: string[];
    type?: "link" | "note" | "pdf" | "youtube" | null;
    link?: string | null;
    title?: string | null;
    summary?: string | null;
    sitename?: string | null;
    brainId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    tags: string[];
    topics: string[];
    userId: mongoose.Types.ObjectId;
    content: string;
    embeddingStatus: "pending" | "processing" | "completed" | "failed";
    chunkIds: string[];
    type?: "link" | "note" | "pdf" | "youtube" | null;
    link?: string | null;
    title?: string | null;
    summary?: string | null;
    sitename?: string | null;
    brainId?: mongoose.Types.ObjectId | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export type Content = InferSchemaType<typeof contentsSchema>;
export declare const contentModel: mongoose.Model<{
    tags: string[];
    topics: string[];
    userId: mongoose.Types.ObjectId;
    content: string;
    embeddingStatus: "pending" | "processing" | "completed" | "failed";
    chunkIds: string[];
    type?: "link" | "note" | "pdf" | "youtube" | null;
    link?: string | null;
    title?: string | null;
    summary?: string | null;
    sitename?: string | null;
    brainId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    tags: string[];
    topics: string[];
    userId: mongoose.Types.ObjectId;
    content: string;
    embeddingStatus: "pending" | "processing" | "completed" | "failed";
    chunkIds: string[];
    type?: "link" | "note" | "pdf" | "youtube" | null;
    link?: string | null;
    title?: string | null;
    summary?: string | null;
    sitename?: string | null;
    brainId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps, {}, mongoose.DefaultSchemaOptions> & {
    tags: string[];
    topics: string[];
    userId: mongoose.Types.ObjectId;
    content: string;
    embeddingStatus: "pending" | "processing" | "completed" | "failed";
    chunkIds: string[];
    type?: "link" | "note" | "pdf" | "youtube" | null;
    link?: string | null;
    title?: string | null;
    summary?: string | null;
    sitename?: string | null;
    brainId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, {
    tags: string[];
    topics: string[];
    userId: mongoose.Types.ObjectId;
    content: string;
    embeddingStatus: "pending" | "processing" | "completed" | "failed";
    chunkIds: string[];
    type?: "link" | "note" | "pdf" | "youtube" | null;
    link?: string | null;
    title?: string | null;
    summary?: string | null;
    sitename?: string | null;
    brainId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps>;
export {};
//# sourceMappingURL=contents.d.ts.map