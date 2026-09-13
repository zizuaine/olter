import { useState } from "react";
import { Search } from "lucide-react";

type ChatBarProps = {
    onSubmit?: (query: string) => void;
    createChat?: (query: string) => void;
    disabled: boolean
}

const ChatBar = ({ createChat, onSubmit, disabled }: ChatBarProps) => {
    const [query, setQuery] = useState("");

    const sendQuery = () => {
        if (!query.trim() || disabled) return;

        if (createChat) {
            createChat(query);
            setQuery("");
            return
        };

        if (onSubmit) {
            onSubmit(query);
            setQuery("");
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