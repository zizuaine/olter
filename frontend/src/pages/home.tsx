import homeBackground from "../assets/background/home.png"
import { useBrain } from "../context/brainContext";
import ChatBar from "../components/chatBar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useChats } from "../context/chatContext";

export const Home = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { selectedBrain } = useBrain();
    const brainId = selectedBrain === "personal"
        ? null
        : selectedBrain;

    const { addChat } = useChats();
    const navigate = useNavigate();

    const createChat = async (query: string) => {
        setIsLoading(true);

        try {
            const token = localStorage.getItem("token");

            const res = await fetch(
                "http://localhost:3000/api/v1/chat",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        query,
                        brainId
                    })
                }
            );

            if (!res.ok) return;

            const data = await res.json();

            addChat({
                _id: data.chatId,
                title: query.slice(0, 50)
            });

            navigate(`/chat/${data.chatId}`, {
                state: { userMessage: query }
            });
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div
            style={{
                backgroundImage: `url(${homeBackground})`,
                backgroundSize: "115%",
            }}
            className="min-h-screen flex flex-col w-full relative bg-no-repeat bg-cover bg-center"
        >
            {/* Text */}
            <div className="absolute left-[40px] top-[20px]">
                <h1 className="font-nour text-[45px] text-[#0033CC]">
                    olter
                </h1>

                <span className="font-helvetica text-[#17191C] text-[28px]">
                    a gateway to connected knowledge
                </span>

                <p className="font-noto text-[#687589]">
                    olter turns everything you read, watch, learn, and write into a
                    knowledge base you can <br />
                    actually talk to. Ask it to connect ideas, explain concepts,
                    summarize or quiz you. <br />
                    And you dont have to build it alone. Share you brain, collaborate
                    with others and build a <br />
                    knowledge base together.
                </p>
            </div>

            {/* Chat bar */}
            <div
                className="
                absolute
                left-1/2
                -translate-x-1/2
                top-[480px]
            "
            >
                <ChatBar
                    createChat={createChat}
                    disabled={isLoading}
                />
            </div>
            <div
                className="absolute bottom-[50px] left-[40px]
                text-[#0033CC] text-[43px] leading-[1.1]
                ">
                <h1
                    className="font-nour"
                >
                    your <br />
                    knowledge. <br />
                    your Context. <br />
                    one <br />
                    coversation.
                </h1>
            </div>
            {isLoading && (
                <div className="absolute left-1/2 -translate-x-1/2 top-[550px] flex gap-1">
                    <span className="animate-bounce text-[#0033CC]">•</span>
                    <span className="animate-bounce delay-100 text-[#0033CC]">•</span>
                    <span className="animate-bounce delay-200 text-[#0033CC]">•</span>
                </div>
            )}
        </div>
    )
}