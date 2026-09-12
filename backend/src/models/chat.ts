import mongoose, { Schema, model } from "mongoose";
import type { HydratedDocument, InferSchemaType } from "mongoose";

const messageSchema = new Schema(
    {
        role: {
            type: String,
            enum: ["user", "assistant"],
            required: true,
        },
        content: { type: String },
        operation: {
            type: String,
            enum: ["answer", "summary", "quiz", "flashcard", "none"],
        },
        quizId: {
            type: mongoose.Types.ObjectId,
            ref: "Quiz"
        },
        questions: [{
            questionNumber: { type: Number },
            question: { type: String },
            options: [String],
            correctAnswer: { type: String },
            explanation: { type: String }
        }],
        flashcards: [{
            question: { type: String },
            answer: { type: String }
        }],
        sourceId: [{
            type: mongoose.Types.ObjectId,
            ref: "Content"
        }],
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
