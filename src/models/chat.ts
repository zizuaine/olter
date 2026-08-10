import mongoose, { Schema, model } from "mongoose";
import type { InferSchemaType } from "mongoose";
import { string } from "zod";
import { required } from "zod/mini";

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
    }
}, {
    timestamps: true,
});
export type Chat = InferSchemaType<typeof chatSchema>;

export const chatModel = model<Chat>("chat", chatSchema)