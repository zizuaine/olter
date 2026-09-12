import mongoose from "mongoose";
import type { InferSchemaType } from "mongoose";
declare const chatSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    title: string;
    userId: mongoose.Types.ObjectId;
    messages: mongoose.Types.DocumentArray<{
        createdAt: NativeDate;
        content: string;
        role: "user" | "assistant";
        sourceId: mongoose.Types.ObjectId[];
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        createdAt: NativeDate;
        content: string;
        role: "user" | "assistant";
        sourceId: mongoose.Types.ObjectId[];
    }, {}, {}> & {
        createdAt: NativeDate;
        content: string;
        role: "user" | "assistant";
        sourceId: mongoose.Types.ObjectId[];
    }>;
    activeContentIds: mongoose.Types.ObjectId[];
    activeChunksIds: string[];
    brainId?: mongoose.Types.ObjectId | null;
    quizId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    title: string;
    userId: mongoose.Types.ObjectId;
    messages: mongoose.Types.DocumentArray<{
        createdAt: NativeDate;
        content: string;
        role: "user" | "assistant";
        sourceId: mongoose.Types.ObjectId[];
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        createdAt: NativeDate;
        content: string;
        role: "user" | "assistant";
        sourceId: mongoose.Types.ObjectId[];
    }, {}, {}> & {
        createdAt: NativeDate;
        content: string;
        role: "user" | "assistant";
        sourceId: mongoose.Types.ObjectId[];
    }>;
    activeContentIds: mongoose.Types.ObjectId[];
    activeChunksIds: string[];
    brainId?: mongoose.Types.ObjectId | null;
    quizId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    title: string;
    userId: mongoose.Types.ObjectId;
    messages: mongoose.Types.DocumentArray<{
        createdAt: NativeDate;
        content: string;
        role: "user" | "assistant";
        sourceId: mongoose.Types.ObjectId[];
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        createdAt: NativeDate;
        content: string;
        role: "user" | "assistant";
        sourceId: mongoose.Types.ObjectId[];
    }, {}, {}> & {
        createdAt: NativeDate;
        content: string;
        role: "user" | "assistant";
        sourceId: mongoose.Types.ObjectId[];
    }>;
    activeContentIds: mongoose.Types.ObjectId[];
    activeChunksIds: string[];
    brainId?: mongoose.Types.ObjectId | null;
    quizId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    title: string;
    userId: mongoose.Types.ObjectId;
    messages: mongoose.Types.DocumentArray<{
        createdAt: NativeDate;
        content: string;
        role: "user" | "assistant";
        sourceId: mongoose.Types.ObjectId[];
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        createdAt: NativeDate;
        content: string;
        role: "user" | "assistant";
        sourceId: mongoose.Types.ObjectId[];
    }, {}, {}> & {
        createdAt: NativeDate;
        content: string;
        role: "user" | "assistant";
        sourceId: mongoose.Types.ObjectId[];
    }>;
    activeContentIds: mongoose.Types.ObjectId[];
    activeChunksIds: string[];
    brainId?: mongoose.Types.ObjectId | null;
    quizId?: mongoose.Types.ObjectId | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export type Chat = InferSchemaType<typeof chatSchema>;
export declare const chatModel: mongoose.Model<{
    title: string;
    userId: mongoose.Types.ObjectId;
    messages: mongoose.Types.DocumentArray<{
        createdAt: NativeDate;
        content: string;
        role: "user" | "assistant";
        sourceId: mongoose.Types.ObjectId[];
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        createdAt: NativeDate;
        content: string;
        role: "user" | "assistant";
        sourceId: mongoose.Types.ObjectId[];
    }, {}, {}> & {
        createdAt: NativeDate;
        content: string;
        role: "user" | "assistant";
        sourceId: mongoose.Types.ObjectId[];
    }>;
    activeContentIds: mongoose.Types.ObjectId[];
    activeChunksIds: string[];
    brainId?: mongoose.Types.ObjectId | null;
    quizId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    title: string;
    userId: mongoose.Types.ObjectId;
    messages: mongoose.Types.DocumentArray<{
        createdAt: NativeDate;
        content: string;
        role: "user" | "assistant";
        sourceId: mongoose.Types.ObjectId[];
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        createdAt: NativeDate;
        content: string;
        role: "user" | "assistant";
        sourceId: mongoose.Types.ObjectId[];
    }, {}, {}> & {
        createdAt: NativeDate;
        content: string;
        role: "user" | "assistant";
        sourceId: mongoose.Types.ObjectId[];
    }>;
    activeContentIds: mongoose.Types.ObjectId[];
    activeChunksIds: string[];
    brainId?: mongoose.Types.ObjectId | null;
    quizId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps, {}, mongoose.DefaultSchemaOptions> & {
    title: string;
    userId: mongoose.Types.ObjectId;
    messages: mongoose.Types.DocumentArray<{
        createdAt: NativeDate;
        content: string;
        role: "user" | "assistant";
        sourceId: mongoose.Types.ObjectId[];
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        createdAt: NativeDate;
        content: string;
        role: "user" | "assistant";
        sourceId: mongoose.Types.ObjectId[];
    }, {}, {}> & {
        createdAt: NativeDate;
        content: string;
        role: "user" | "assistant";
        sourceId: mongoose.Types.ObjectId[];
    }>;
    activeContentIds: mongoose.Types.ObjectId[];
    activeChunksIds: string[];
    brainId?: mongoose.Types.ObjectId | null;
    quizId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, {
    title: string;
    userId: mongoose.Types.ObjectId;
    messages: mongoose.Types.DocumentArray<{
        createdAt: NativeDate;
        content: string;
        role: "user" | "assistant";
        sourceId: mongoose.Types.ObjectId[];
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        createdAt: NativeDate;
        content: string;
        role: "user" | "assistant";
        sourceId: mongoose.Types.ObjectId[];
    }, {}, {}> & {
        createdAt: NativeDate;
        content: string;
        role: "user" | "assistant";
        sourceId: mongoose.Types.ObjectId[];
    }>;
    activeContentIds: mongoose.Types.ObjectId[];
    activeChunksIds: string[];
    brainId?: mongoose.Types.ObjectId | null;
    quizId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps>;
export {};
//# sourceMappingURL=chat.d.ts.map