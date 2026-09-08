type QuizIntent = {
    type: "answer" | "question" | "all_answers" | "none";
    questionNumbers: number[];
};
type Questions = {
    questionNumber: number;
    question: string;
};
export declare const detectQuizIntent: (query: string, questions: Questions[]) => Promise<QuizIntent>;
export {};
//# sourceMappingURL=detectquizIntent.d.ts.map