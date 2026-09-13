import { useLocation, useParams } from "react-router-dom"
import { ArrowLeft, MoreHorizontal } from "lucide-react";
import ChatBar from "../components/chatBar";
import { useBrain } from "../context/brainContext";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import type { Content } from "./files";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SourceCard from "../components/sourceCard";
import avatar from "../assets/sidebar-logo/avatar.png"
import QuizCard from "../components/quizcard";
import FlashcardsCard from "../components/flashcardsCard";


export type Source = Content

type QuizQuestion = {
    questionNumber: number;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
};

type Flashcard = {
    question: string;
    answer: string;
};

type Message = {
    _id: string;
    role: "user" | "assistant";
    content?: string;
    operation?: "answer" | "summary" | "quiz" | "flashcard" | "none";
    quizId?: string;
    questions?: QuizQuestion[];
    flashcards?: Flashcard[];
    createdAt: string;
    sourceId?: Source[];
};

type ChatResponse = {
    operation: "answer" | "summary" | "quiz" | "flashcard" | "none";
    content?: string;
    quizId?: string;
    questions?: QuizQuestion[];
    flashcards?: Flashcard[];
    sources?: Source[];
};

export type Chat = {
    _id: string;
    title: string;
    messages: Message[];
    brainId: string | null;
};

const ChatPage = () => {

    const { chatId } = useParams();
    const { selectedBrain } = useBrain();
    const brainId = selectedBrain === "personal"
        ? null
        : selectedBrain;

    const [chatData, setChatData] = useState<Chat | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const location = useLocation()

    {/*for new chat */ }
    useEffect(() => {
        if (location.state?.userMessage) {
            const query = location.state.userMessage;

            if (!query || !chatId) return;
            setChatData({
                _id: chatId,
                title: query.slice(0, 50),
                brainId: brainId,
                messages: []
            })

            addUserMessage(query);

            const sendMessage = async () => {
                setLoading(true)
                const token = localStorage.getItem("token");
                const res = await fetch(`http://localhost:3000/api/v1/chat/message/${chatId}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        query,
                    })
                })
                if (!res.ok) {
                    setLoading(false)
                    return
                };
                const data = await res.json();
                handleResponse(data)
            }
            sendMessage();

            navigate(".", {
                replace: true,
                state: null
            });
        }
    }, [chatId])

    {/*for exisiting chat */ }
    useEffect(() => {
        if (location.state?.userMessage) return;
        const fetchCurrentChat = async () => {
            const token = localStorage.getItem("token");
            const res = await fetch(`http://localhost:3000/api/v1/chat/${chatId}`, {
                method: "GET",
                headers: { authorization: `Bearer ${token}` }
            });
            if (!res.ok) return;
            const data = await res.json();
            setChatData(data.chat);
        };
        fetchCurrentChat();

    }, [chatId]);

    const handleSubmit = async (query: string) => {
        addUserMessage(query);
        setLoading(true)
        const token = localStorage.getItem("token");
        const res = await fetch(
            `http://localhost:3000/api/v1/chat/message/${chatId}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
                body: JSON.stringify({ query })
            }
        );
        if (!res.ok) { setLoading(false); return; }
        const data = await res.json();
        handleResponse(data);
        setLoading(false)
    }
    const addUserMessage = (query: string) => {
        setChatData(prev => {
            if (!prev) return null;
            return {
                ...prev,
                messages: [
                    ...prev.messages,
                    {
                        _id: crypto.randomUUID(),
                        role: "user",
                        content: query,
                        createdAt: new Date().toISOString()
                    }
                ]
            }
        });
        setLoading(true)
    }
    const handleResponse = (data: ChatResponse) => {
        setLoading(false);

        setChatData(prev => {
            if (!prev) return null;

            return {
                ...prev,
                messages: [
                    ...prev.messages,
                    {
                        _id: crypto.randomUUID(),
                        role: "assistant",

                        operation: data.operation,

                        content: data.content,

                        quizId: data.quizId,

                        questions: data.questions,

                        flashcards: data.flashcards,

                        sourceId: data.sources,

                        createdAt: new Date().toISOString()
                    }
                ]
            };
        });
    };

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [chatData?.messages, loading]);

    return (
        <div className="flex h-screen flex-col">
            {/* ───────────────── HEADER ───────────────── */}
            <header className="flex h-[70px] shrink-0 items-center px-7 text-[#596579] ">

                {/* Back */}
                <button
                    onClick={() => navigate(-1)}
                    className="cursor-pointer">
                    <ArrowLeft size={24} />
                </button>

                {/* Chat title */}
                <div className="ml-5">
                    <h1 className="font-helvetica text-[20px]  ">
                        {chatData?.title}
                    </h1>
                </div>

                {/* More */}
                <button className="ml-auto">
                    <MoreHorizontal size={24} />
                </button>

            </header>

            <main className="flex min-h-0 flex-1 flex-col">
                <div className="flex-1 overflow-y-auto px-7">
                    <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-8 py-8">

                        {chatData?.messages.map(message => (
                            message.role === "user" ? (
                                // USER MESSAGE
                                <div key={message._id} className="flex flex-col items-end">
                                    <div className="max-w-[650px] rounded-2xl rounded-tr-none bg-[#0033CC] px-6 py-4 shadow-[0_5px_5px_rgba(0,0,0,0.08)]">
                                        <p className="font-noto text-[16px] text-white">
                                            {message.content}
                                        </p>
                                    </div>

                                    <span className="mt-2 font-helvetica text-[13px] text-[#777]">
                                        {new Date(message.createdAt).toLocaleString()}
                                    </span>
                                </div>
                            ) : (
                                // ASSISTANT MESSAGE
                                <div key={message._id} className="flex gap-4 relative">

                                    {/* Avatar */}
                                    <div className=" absolute top-[-15px] left-[-55px] h-10 w-10 shrink-0 rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.1)] overflow-hidden">
                                        <img
                                            src={avatar}
                                            alt="logo"
                                            className="h-full w-full object-cover"
                                        />
                                    </div>

                                    {/* Right side */}
                                    <div className="min-w-0">

                                        {/* ONLY the response has the background */}
                                        <div className="max-w-[700px] rounded-2xl rounded-tl-none bg-[#F8F5F0] px-7 py-6 shadow-[0_5px_5px_rgba(0,0,0,0.08)]">
                                            <div className="font-noto text-[16px] leading-7">
                                                {message.content && (
                                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                        {message.content
                                                            .replace(/\\<br\s*\/?>/gi, "\n")
                                                            .replace(/\\\|/g, "|")}
                                                    </ReactMarkdown>
                                                )}

                                                {message.operation === "flashcard" && message.flashcards && (
                                                    <FlashcardsCard
                                                        flashcards={message.flashcards}
                                                    />
                                                )}


                                                {message.operation === "quiz" && message.questions && (
                                                    <QuizCard
                                                        questions={message.questions}
                                                        quizId={message.quizId}
                                                    />
                                                )}
                                            </div>
                                        </div>

                                        {/* Sources have NO background */}
                                        {message.sourceId && message.sourceId.length > 0 && (
                                            <div className="mt-6">

                                                <p className="font-helvetica text-[13px] text-[#687589]">
                                                    Sources
                                                </p>

                                                <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
                                                    {message.sourceId.map(source => (
                                                        <SourceCard
                                                            key={source._id}
                                                            source={source}
                                                        />
                                                    ))}
                                                </div>

                                            </div>
                                        )}

                                    </div>

                                </div>
                            )
                        ))}
                        {loading && (
                            <div className="flex gap-4">
                                <div className="bg-[#F8F5F0] rounded-2xl px-7 py-6">
                                    <div className="flex gap-1">
                                        <span className="animate-bounce">•</span>
                                        <span className="animate-bounce delay-100">•</span>
                                        <span className="animate-bounce delay-200">•</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>
            </main>


            <div className="m-auto mb-8">
                <ChatBar
                    onSubmit={handleSubmit}
                    disabled={loading}
                />
            </div>
        </div>
    )
}

export default ChatPage;
