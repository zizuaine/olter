import { createContext, useContext, useEffect, useState } from "react";
import { API_URL } from "../config/api";

type ChatDescription = {
    _id: string;
    title: string
}

type ChatContextType = {
    chats: ChatDescription[];
    addChat: (chat: ChatDescription) => void;
}

const ChatContext = createContext<ChatContextType | null>(null);

export const ChatContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [chats, setChats] = useState<ChatDescription[]>([])

    useEffect(() => {
        const fetchChats = async () => {
            const token = localStorage.getItem("token");
            const res = await fetch(`${API_URL}/api/v1/chat`, {
                headers: { authorization: `Bearer ${token}` }
            });
            if (!res.ok) return;
            const data = await res.json();
            console.log(data)
            setChats(data.chats)
        }
        fetchChats();
    }, []);

    const addChat = (chat: ChatDescription) => {
        setChats(prev => [
            chat,
            ...prev
        ])
    }

    return (
        <ChatContext.Provider value={{ chats, addChat }}>
            {children}
        </ChatContext.Provider>
    )
}

export const useChats = () => {
    const ctx = useContext(ChatContext);
    if (!ctx) throw new Error("useChats must be used inside ChatProvider");
    return ctx
}