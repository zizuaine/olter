import mongoose, { Schema, model } from "mongoose";
import type { InferSchemaType } from "mongoose";
import crypto from "crypto";

const brainSchema = new Schema(
    {
        members: [{ type: mongoose.Types.ObjectId, required: true }],
        ownerId: { type: mongoose.Types.ObjectId, required: true },
        name: {
            type: String,
            required: true
        },
        shareToken: {
            type: String,
            default: () => crypto.randomBytes(16).toString("hex"),
            unique: true
        }
    }, { timestamps: true }
);

export type Brain = InferSchemaType<typeof brainSchema>;
export const brainModel = model<Brain>("Brain", brainSchema);