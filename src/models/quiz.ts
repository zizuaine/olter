import mongoose, { Schema, model } from "mongoose";

const questionSchema = new Schema({
    questionNumber: { type: Number, required: true },
    question: { type: String, required: true },
    options: { type: [String], required: true }
});

const answerSchema = new Schema({
    questionNumber: { type: Number, required: true },
    correctAnswer: { type: String, required: true },
    explanation: { type: String, required: true }
});

const quizSchema = new Schema(
    {
        userId: { type: mongoose.Types.ObjectId, required: true },
        contentIds: [{ type: mongoose.Types.ObjectId, ref: "Content", required: true }],
        questions: { type: [questionSchema], required: true },
        answers: { type: [answerSchema], required: true }
    },
    { timestamps: true }
);

export const quizModel = model("Quiz", quizSchema); 