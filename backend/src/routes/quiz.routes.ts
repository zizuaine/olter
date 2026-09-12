import { Router } from "express";
import type { Request, Response } from "express";
import { quizModel } from "../models/quiz.js";
import { AuthMiddleware } from "../middleware/auth.js";

const quizRouter = Router();

quizRouter.get("/:quizId/answers/:questionNumber", AuthMiddleware, async (req: Request, res: Response) => {
    const { quizId, questionNumber } = req.params;
    const userId = req.userId
    if (!userId) return res.status(401).json({
        message: "no user found"
    })

    const quiz = await quizModel.findOne({
        _id: quizId,
        userId
    })
    if (!quiz) throw new Error("no quiz found");

    const answer = quiz.questions.find(q =>
        q.questionNumber === Number(questionNumber)
    )?.correctAnswer

    if (!answer) return res.status(404).json({ message: "Answer not found" });

    res.status(200).json({ answer });
});

export { quizRouter };