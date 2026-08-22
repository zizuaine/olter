import mongoose, { Schema, model } from "mongoose";
import type { HydratedDocument, InferSchemaType } from "mongoose";

const messageSchema = new Schema(
    {
        role: {
            type: String,
            enum: ["user", "assistant"],
            required: true,
        },
        content: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
    }
);

const chatSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },

    title: {
        type: String,
        default: "New Chat",
    },

    messages: [messageSchema],

    quizId: {
        type: mongoose.Types.ObjectId,
        ref: "Quiz",
        default: null
    },

    activeContentIds: [{
        type: mongoose.Types.ObjectId,
        ref: "Content",
    }],

    activeChunksIds: [{
        type: String
    }],

    brainId: {
        type: mongoose.Types.ObjectId,
        ref: "Brain"
    }

}, {
    timestamps: true,
});
export type Chat = InferSchemaType<typeof chatSchema>

export const chatModel = model<Chat>("chat", chatSchema)
