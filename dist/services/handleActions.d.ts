type QuizResult = {
    questions: {
        questionNumber: number;
        question: string;
        options: string[];
        correctAnswer: string;
        explanation: string;
    }[];
};
export type SummaryResult = {
    summary: string;
};
type FlashcardResult = {
    question: string;
    answer: string;
}[];
type Operation = "flashcard" | "quiz" | "summary";
export declare const handleActionResponse: (operation: Operation, content: string, contentIds: string[], user: string, chatId: string) => Promise<QuizResult | SummaryResult | FlashcardResult | {
    quizId: import("mongoose").Types.ObjectId;
    questions: import("mongoose").Types.DocumentArray<{
        options: string[];
        questionNumber: number;
        question: string;
        correctAnswer: string;
        explanation: string;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
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
}>;
export {};
//# sourceMappingURL=handleActions.d.ts.map