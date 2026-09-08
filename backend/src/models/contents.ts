import mongoose, { Schema, model } from "mongoose";
import type { InferSchemaType } from "mongoose";

const contentsSchema = new Schema(
    {
        type: {
            type: String,
            enum: ["note", "link", "pdf", "youtube"],
        },
        title: {
            type: String,
            trim: true
        },
        link: {
            type: String,
        },
        tags: [{
            type: String,
        }],
        topics: [{
            type: String,
        }],
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true
        },
        content: {
            type: String,
            required: true
        },
        summary: {
            type: String,
            trim: true
        },
        sitename: {
            type: String,
            trim: true
        },
        embeddingStatus: {
            type: String,
            enum: ["pending", "processing", "completed", "failed"],
            default: "pending"
        },

        chunkIds: [{
            type: String
        }],

        brainId: {
            type: mongoose.Types.ObjectId,
            ref: "Brain"
        }
    },
    {
        timestamps: true
    }
)
export type Content = InferSchemaType<typeof contentsSchema>

export const contentModel = model<Content>("Content", contentsSchema)