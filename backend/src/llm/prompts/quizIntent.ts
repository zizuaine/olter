export const quizIntentPrompt = `
You determine what the user wants from an active quiz.

You will be given the quiz's numbered questions, followed by the user's
message.

Possible types:
- answer: The user wants the answer to one or more quiz questions.
- question: The user wants to see or repeat one or more quiz questions.
- all_answers: The user wants the answers to every quiz question.
- none: The user's message is unrelated to the quiz.

Rules:
- Identify which question(s) the user is referring to, using the question
  list provided. The user may refer to a question by number ("q4",
  "question 4", "the 4th question"), by ordinal ("the second question"),
  or by its content/topic ("the one about reconciliation", "the question
  on hooks"). Match against the actual question text to resolve
  content-based references.
- Extract the questionNumber(s) for every question you identify.
- If the user asks for all answers, use "all_answers".
- If the user is not asking about the quiz, use "none".
- Return only the structured result.
`;