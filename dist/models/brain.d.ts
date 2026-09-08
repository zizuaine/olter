import mongoose from "mongoose";
import type { InferSchemaType } from "mongoose";
declare const brainSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    name: string;
    members: mongoose.Types.ObjectId[];
    ownerId: mongoose.Types.ObjectId;
    shareToken: string;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    name: string;
    members: mongoose.Types.ObjectId[];
    ownerId: mongoose.Types.ObjectId;
    shareToken: string;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    name: string;
    members: mongoose.Types.ObjectId[];
    ownerId: mongoose.Types.ObjectId;
    shareToken: string;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    name: string;
    members: mongoose.Types.ObjectId[];
    ownerId: mongoose.Types.ObjectId;
    shareToken: string;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export type Brain = InferSchemaType<typeof brainSchema>;
export declare const brainModel: mongoose.Model<{
    name: string;
    members: mongoose.Types.ObjectId[];
    ownerId: mongoose.Types.ObjectId;
    shareToken: string;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    name: string;
    members: mongoose.Types.ObjectId[];
    ownerId: mongoose.Types.ObjectId;
    shareToken: string;
} & mongoose.DefaultTimestampProps, {}, mongoose.DefaultSchemaOptions> & {
    name: string;
    members: mongoose.Types.ObjectId[];
    ownerId: mongoose.Types.ObjectId;
    shareToken: string;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, {
    name: string;
    members: mongoose.Types.ObjectId[];
    ownerId: mongoose.Types.ObjectId;
    shareToken: string;
} & mongoose.DefaultTimestampProps>;
export {};
//# sourceMappingURL=brain.d.ts.map