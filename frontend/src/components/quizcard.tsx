import { useState } from "react";
import { API_URL } from "../config/api";

type Question = {
    questionNumber: number;
    question: string;
    options: string[];
};

type QuizCardProps = {
    questions: Question[];
    quizId?: string;
};

const QuizCard = ({ questions, quizId }: QuizCardProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selected, setSelected] = useState<string | null>(null);
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [checking, setChecking] = useState(false);

    const current = questions[currentIndex];

    const handleSelect = async (option: string) => {
        if (selected) return;
        setSelected(option);
        const token = localStorage.getItem("token");
        setChecking(true);
        const res = await fetch(
            `${API_URL}/api/v1/quiz/${quizId}/answers/${current.questionNumber}`,
            { headers: { authorization: `Bearer ${token}` } }
        );
        const data = await res.json();
        if (!res.ok) {
            setSelected(null);
            setChecking(false);
            return;
        }
        setCorrectAnswer(data.answer);
        setChecking(false);
    };

    const next = () => {
        setSelected(null);
        setCorrectAnswer("");
        setCurrentIndex(prev => Math.min(prev + 1, questions.length - 1));
    };

    const getStyle = (option: string) => {
        if (!selected || checking) {
            return "border-[#DDD5C6]";
        }

        if (option === correctAnswer) {
            return "border-green-400 bg-green-50 text-green-700";
        }

        if (option === selected) {
            return "border-red-400 bg-red-50 text-red-700";
        }

        return "border-[#DDD5C6] opacity-50";
    };

    return (
        <div className="w-[380px] rounded-[12px] border border-white/50 bg-[#F8F2EB] px-5 py-5 shadow-[0_5px_15px_rgba(0,0,0,0.08)]">

            <div className="flex items-center justify-between mb-4">
                <span className="rounded-[5px] border border-[#0066FF] px-[5px] py-[3px] font-helvetica text-[12px] font-medium text-[#0055D9]">
                    Quiz
                </span>
                <span className="font-helvetica text-[12px] text-[#777B80]">
                    Question {currentIndex + 1} of {questions.length}
                </span>
            </div>

            <p className="font-helvetica font-semibold text-[16px] text-[#17191C] leading-[1.4] mb-4">
                {current.question}
            </p>

            <div className="flex flex-col gap-2">
                {current.options.map((option, i) => (
                    <button
                        key={i}
                        onClick={() => handleSelect(option)}
                        disabled={!!selected}
                        className={`
              flex items-center gap-3 w-full px-4 py-3
              rounded-[10px] border text-left
              font-noto text-[14px] cursor-pointer
              transition-colors duration-150
              ${getStyle(option)}
            `}
                    >
                        <span className="w-[22px] h-[22px] rounded-full border border-[#DDD5C6] flex items-center justify-center font-helvetica text-[11px] shrink-0">
                            {String.fromCharCode(65 + i)}
                        </span>
                        {option}
                    </button>
                ))}
            </div>

            <div className="flex justify-between">
                {checking && (
                    <span className="font-helvetica text-[10px]">
                        checking
                    </span>
                )}
                {selected && !checking && currentIndex < questions.length - 1 && (
                    <button
                        onClick={next}
                        className="mt-4 font-helvetica text-[13px] text-[#0033CC] cursor-pointer"
                    >
                        Next question →
                    </button>
                )}
            </div>

            {selected && !checking && currentIndex === questions.length - 1 && (
                <p className="mt-4 font-helvetica text-[13px] text-[#596579]">
                    Quiz complete 🎉
                </p>
            )}
        </div>
    );
};

export default QuizCard;