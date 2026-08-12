import mongoose, { Schema, model } from "mongoose";
import type { InferSchemaType } from "mongoose";

const contentsSchema = new Schema(
    {
        type: {
            type: String,
            required: true,
            enum: ["note", "link", "pdf", "youtube"],
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        link: {
            type: String,
            required: true
        },
        tags: [{
            type: String,
        }],
        topics: [{
            type: String,
        }],
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "User"
        },
        content: {
            type: String,
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
        }

    }
)
export type Content = InferSchemaType<typeof contentsSchema>

export const contentModel = model<Content>("Content", contentsSchema)