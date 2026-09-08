import { Schema } from "mongoose";
import type { InferSchemaType } from "mongoose";
declare const userSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    username: string;
    password: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, {
    username: string;
    password: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, Omit<import("mongoose").DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    username: string;
    password: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    username: string;
    password: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export type User = InferSchemaType<typeof userSchema>;
export declare const UserModel: import("mongoose").Model<{
    username: string;
    password: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
} & import("mongoose").DefaultTimestampProps, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    username: string;
    password: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
} & import("mongoose").DefaultTimestampProps, {}, import("mongoose").DefaultSchemaOptions> & {
    username: string;
    password: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, {
    username: string;
    password: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
} & import("mongoose").DefaultTimestampProps>;
export {};
//# sourceMappingURL=user.d.ts.map