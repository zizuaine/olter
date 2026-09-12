import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useChats } from "../context/chatContext";

type ChatBarProps = {
    brainId: string | null;
    chatId?: string;
    onSend?: (query: string) => void;
    onResponse?: (data: any) => void;
    createChat?: (query: string) => Promise<string | null>;
}

const ChatBar = ({ brainId, chatId, onResponse, onSend, createChat }: ChatBarProps) => {
    const [query, setQuery] = useState("");

    const { addChat } = useChats();
    const navigate = useNavigate();

    const sendQuery = async () => {
        if (!query.trim()) return;

        const currentQuery = query;
        setQuery("");

        let currentChatId: string | null = chatId ?? null;

        if (!currentChatId && createChat) {
            currentChatId = await createChat(query)
        }

        if (!currentChatId) return;

        navigate(`/chat/${currentChatId}`)

        onSend?.(currentQuery)

        const token = localStorage.getItem("token");

        const url = `http://localhost:3000/api/v1/chat/message/${currentChatId}`
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ query, brainId })
        });
        if (!res.ok) return;
        const data = await res.json();
        console.log(data)

        let content: string | undefined;

        if (data.operation === "answer") content = data.answer;
        if (data.operation === "summary") content = data.summary;

        onResponse?.({
            query: currentQuery,
            operation: data.operation,
            content,
            quizId: data.quizId,
            questions: data.questions,
            flashcards: data.flashcards,
            sources: data.sources
        });

        if (!chatId) {
            addChat({ _id: data.chatId, title: query.slice(0, 50) })
        }
    }
    return (
        <div className="  w-[620px]
                h-[50px]
                
                flex
                items-center
                gap-2

                rounded-[20px]
                bg-white/60
                border border-white/80
                px-4

                shadow-[0_5px_8px_rgba(0,0,0,0.30)]
                backdrop-blur-[2px]">
            <Search
                size={15}
                strokeWidth={1.8}
                className="shrink-0 text-[#596579]"
            />

            <input
                type="text"
                placeholder="ask Olter anything..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendQuery()}
                className="
                    w-full
                    bg-transparent
                    outline-none
                    font-noto
                    text-[16px]
                    text-[#17191C]
                    placeholder:text-[#777B80]
                "
            />
        </div>
    )
}

export default ChatBar;