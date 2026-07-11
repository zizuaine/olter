import { Schema, model } from "mongoose";
import type { InferSchemaType } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            minlength: 3,
            maxlength: 10,
            required: true,
            trim: true
        },
        password: {
            type: String,
            minlength: 3,
            required: true,
            trim: true
        },
        email: {
            type: String,
            lowercase: true,
            unique: true,
            required: true,
            trim: true
        },
        firstName: {
            type: String,
            trim: true
        },
        lastName: {
            type: String,
            trim: true
        },
    },
    {
        timestamps: true,
    }
);
export type User = InferSchemaType<typeof userSchema>;

export const UserModel = model<User>("User", userSchema);