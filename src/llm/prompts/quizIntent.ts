export const quizIntentPrompt = `
You determine what the user wants from an active quiz.

Possible types:

- answer: The user wants the answer to one or more quiz questions.
- question: The user wants to see or repeat one or more quiz questions.
- all_answers: The user wants the answers to every quiz question.
- none: The user's message is unrelated to the quiz.

Rules:
- Extract all question numbers mentioned by the user.
- If the user asks for all answers, use "all_answers".
- If the user is not asking about the quiz, use "none".
- Return only the structured result.
`;