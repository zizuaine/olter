import mongoose from "mongoose";
export declare const quizModel: mongoose.Model<{
    userId: mongoose.Types.ObjectId;
    contentIds: mongoose.Types.ObjectId[];
    questions: mongoose.Types.DocumentArray<{
        options: string[];
        questionNumber: number;
        question: string;
        correctAnswer: string;
        explanation: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        options: string[];
        questionNumber: number;
        question: string;
        correctAnswer: string;
        explanation: string;
    }, {}, {}> & {
        options: string[];
        questionNumber: number;
        question: string;
        correctAnswer: string;
        explanation: string;
    }>;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    userId: mongoose.Types.ObjectId;
    contentIds: mongoose.Types.ObjectId[];
    questions: mongoose.Types.DocumentArray<{
        options: string[];
        questionNumber: number;
        question: string;
        correctAnswer: string;
        explanation: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        options: string[];
        questionNumber: number;
        question: string;
        correctAnswer: string;
        explanation: string;
    }, {}, {}> & {
        options: string[];
        questionNumber: number;
        question: string;
        correctAnswer: string;
        explanation: string;
    }>;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    userId: mongoose.Types.ObjectId;
    contentIds: mongoose.Types.ObjectId[];
    questions: mongoose.Types.DocumentArray<{
        options: string[];
        questionNumber: number;
        question: string;
        correctAnswer: string;
        explanation: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        options: string[];
        questionNumber: number;
        question: string;
        correctAnswer: string;
        explanation: string;
    }, {}, {}> & {
        options: string[];
        questionNumber: number;
        question: string;
        correctAnswer: string;
        explanation: string;
    }>;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    userId: mongoose.Types.ObjectId;
    contentIds: mongoose.Types.ObjectId[];
    questions: mongoose.Types.DocumentArray<{
        options: string[];
        questionNumber: number;
        question: string;
        correctAnswer: string;
        explanation: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        options: string[];
        questionNumber: number;
        question: string;
        correctAnswer: string;
        explanation: string;
    }, {}, {}> & {
        options: string[];
        questionNumber: number;
        question: string;
        correctAnswer: string;
        explanation: string;
    }>;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    userId: mongoose.Types.ObjectId;
    contentIds: mongoose.Types.ObjectId[];
    questions: mongoose.Types.DocumentArray<{
        options: string[];
        questionNumber: number;
        question: string;
        correctAnswer: string;
        explanation: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        options: string[];
        questionNumber: number;
        question: string;
        correctAnswer: string;
        explanation: string;
    }, {}, {}> & {
        options: string[];
        questionNumber: number;
        question: string;
        correctAnswer: string;
        explanation: string;
    }>;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    userId: mongoose.Types.ObjectId;
    contentIds: mongoose.Types.ObjectId[];
    questions: mongoose.Types.DocumentArray<{
        options: string[];
        questionNumber: number;
        question: string;
        correctAnswer: string;
        explanation: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        options: string[];
        questionNumber: number;
        question: string;
        correctAnswer: string;
        explanation: string;
    }, {}, {}> & {
        options: string[];
        questionNumber: number;
        question: string;
        correctAnswer: string;
        explanation: string;
    }>;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    userId: mongoose.Types.ObjectId;
    contentIds: mongoose.Types.ObjectId[];
    questions: mongoose.Types.DocumentArray<{
        options: string[];
        questionNumber: number;
        question: string;
        correctAnswer: string;
        explanation: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        options: string[];
        questionNumber: number;
        question: string;
        correctAnswer: string;
        explanation: string;
    }, {}, {}> & {
        options: string[];
        questionNumber: number;
        question: string;
        correctAnswer: string;
        explanation: string;
    }>;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    userId: mongoose.Types.ObjectId;
    contentIds: mongoose.Types.ObjectId[];
    questions: mongoose.Types.DocumentArray<{
        options: string[];
        questionNumber: number;
        question: string;
        correctAnswer: string;
        explanation: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        options: string[];
        questionNumber: number;
        question: string;
        correctAnswer: string;
        explanation: string;
    }, {}, {}> & {
        options: string[];
        questionNumber: number;
        question: string;
        correctAnswer: string;
        explanation: string;
    }>;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=quiz.d.ts.map