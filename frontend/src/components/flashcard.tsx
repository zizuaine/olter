import { useState } from "react";

type Flashcard = {
    question: string;
    answer: string;
};

type FlashCardProps = {
    flashcards: Flashcard[];
};

const FlashCard = ({ flashcards }: FlashCardProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);

    const current = flashcards[currentIndex];

    const next = () => {
        setFlipped(false);
        setCurrentIndex(prev => Math.min(prev + 1, flashcards.length - 1));
    };

    const prev = () => {
        setFlipped(false);
        setCurrentIndex(prev => Math.max(prev - 1, 0));
    };

    return (
        <div className="w-[340px] rounded-[12px] border border-white/50 bg-[#F8F2EB] px-5 py-5 shadow-[0_5px_15px_rgba(0,0,0,0.08)]">

            <div className="flex items-center justify-between mb-4">
                <span className="rounded-[5px] border border-[#0066FF] px-[5px] py-[3px] font-helvetica text-[12px] font-medium text-[#0055D9]">
                    Flashcard
                </span>
                <span className="font-helvetica text-[12px] text-[#777B80]">
                    {currentIndex + 1} / {flashcards.length}
                </span>
            </div>

            <div
                onClick={() => setFlipped(!flipped)}
                className={`
          min-h-[140px] rounded-[10px] p-4 cursor-pointer
          flex flex-col justify-between
          transition-colors duration-200
          ${flipped
                        ? "bg-[#EEF4FF] border border-[#0066FF]/30"
                        : "bg-white/60 border border-white/80"
                    }
        `}
            >
                <p className={`font-noto text-[15px] leading-[1.5] ${flipped ? "text-[#0033CC]" : "text-[#17191C]"}`}>
                    {flipped ? current.answer : current.question}
                </p>
                <span className="font-helvetica text-[12px] text-[#777B80] mt-3">
                    {flipped ? "Click to see question" : "Click to reveal answer"}
                </span>
            </div>

            <div className="flex items-center justify-between mt-4">
                <button
                    onClick={prev}
                    disabled={currentIndex === 0}
                    className="font-helvetica text-[13px] text-[#596579] disabled:opacity-30 cursor-pointer"
                >
                    ← Prev
                </button>
                <button
                    onClick={() => setFlipped(!flipped)}
                    className="font-helvetica text-[13px] text-[#0033CC] cursor-pointer"
                >
                    {flipped ? "See question" : "Reveal answer"}
                </button>
                <button
                    onClick={next}
                    disabled={currentIndex === flashcards.length - 1}
                    className="font-helvetica text-[13px] text-[#596579] disabled:opacity-30 cursor-pointer"
                >
                    Next →
                </button>
            </div>
        </div>
    );
};

export default FlashCard;