import { UserIcon, ChevronDown, Plus, Rss } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { useBrain } from "../context/brainContext"
import Button from "../components/button"
import FileCard from "../components/fileCard"
import NewContentModal from "../components/newContent"
import { AnimatePresence } from "framer-motion"
import { motion } from "framer-motion"
import ExpandedCard from "../components/expandedCard"
import filesBackground from "../assets/background/dashboard-background.png"
import { API_URL } from "../config/api";

export type Content = {
    _id: string,
    type: "note" | "link" | "pdf" | "youtube";
    title?: string;
    link?: string;
    tags: string[];
    topics: string[];
    content?: string;
    summary?: string;
    sitename?: string;
    embeddingStatus: "pending" | "processing" | "completed" | "failed";
    userId: {
        username: string;
    };
    createdAt: string;
    updatedAt: string;
}


export const Files = () => {
    const [brainFilterMenu, setBrainFilterMenu] = useState(false)
    const [contents, setContents] = useState<Content[]>([]);
    const [newContentOpen, setNewContentOpen] = useState(false)
    const [cardToggleMenu, setCardToggleMenu] = useState<string | null>(null)
    const [expandedCardContent, setExpandedCardContent] = useState<Content | null>(null)

    const { selectedBrain, setSelectedBrain, allBrains } = useBrain();

    const brainId = selectedBrain === "personal"
        ? null
        : selectedBrain;

    const getContents = useCallback(async (signal?: AbortSignal) => {
        try {
            const token = localStorage.getItem("token");

            const res = await fetch(
                `${API_URL}/api/v1/contents?brainId=${brainId}`,
                {
                    headers: {
                        authorization: `Bearer ${token}`
                    },
                    signal
                }
            );

            if (!res.ok) return;

            const data = await res.json();
            setContents(data.contents);

        } catch (error) {
            if (error instanceof Error && error.name === "AbortError") {
                return;
            }

            console.error(error);
        }
    }, [brainId])

    useEffect(() => {
        const controller = new AbortController();
        getContents(controller.signal)

        return () => {
            controller.abort
        }
    }, [getContents]);

    useEffect(() => {
        let embeddingsInProcess = false;
        for (const content of contents) {
            if (
                content.embeddingStatus === "pending" ||
                content.embeddingStatus === "processing"
            ) {
                embeddingsInProcess = true;
                break;
            };
            if (!embeddingsInProcess) return;
            const interval = setInterval(() => {
                getContents();
            }, 2000)
            return () =>
                clearInterval(interval)
        }
    }, [contents, getContents])

    const handleCardClick = async (content: Content) => {
        const token = localStorage.getItem("token")
        const res = await fetch(`${API_URL}/api/v1/contents/${content._id}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        if (!res.ok) return;
        const data = await res.json();
        setExpandedCardContent(data.content)
    }

    return (
        <div
            style={{
                backgroundImage: `url(${filesBackground})`
            }}
            className="min-h-screen flex flex-col w-full relative overflow-hidden bg-no-repeat bg-cover bg-center">
            <div className="heading relative shrink-0 mb-24">
                <div className="font-helvetica text-[14px] text-[#0033CC]
                                h-[50px] items-center m-2 pl-16
                                flex justify-between w-full 

                ">
                    <button
                        onClick={() => setBrainFilterMenu(!brainFilterMenu)}
                        className="flex items-center gap-2 cursor-pointer">
                        <UserIcon size={17}
                            strokeWidth={2} />
                        <span>{allBrains.find(brain => brain._id == selectedBrain)?.name}</span>
                        <ChevronDown size={15}
                            strokeWidth={2} />
                    </button>
                    {brainFilterMenu && (
                        <div className="
                                    absolute
                                    mt-30
                                    w-[125px]
                                    bg-transparent
                                    bg-white/70
                                    border border-[#DDD5C6]
                                    rounded-xl
                                    shadow-[0px_4px_16px_rgba(0,0,0,0.10)]
                                    p-1
                                    z-50
                            ">
                            {allBrains.map((brain) =>
                                <div key={brain._id} >
                                    <button
                                        onClick={() => setSelectedBrain(brain._id)}
                                        className={`brainMenu-button ${selectedBrain === brain._id
                                            ? " text-[#0033CC]"
                                            : "text-[#3F4650] "
                                            }`}
                                    >
                                        {brain.name}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="absolute right-18">
                        <Button
                            onClick={() => setNewContentOpen(true)} >
                            <Plus size={18} strokeWidth={2} />
                            New
                        </Button>
                    </div>

                </div>
                <div className="mt-10 ml-18">
                    <h1 className="font-nour text-[40px]
                     text-[#0033CC]"
                    >files</h1>
                    <p className="font-helvetica
                                text-[#687589]"
                    >All your knowledge, in one place.<br />
                        Upload, organize, and connect everything that matters
                    </p>
                </div>
            </div>

            <main className="ml-11 flex-1 min-h-0">

                <div className="cards-container  h-full overflow-y-auto mt-0">
                    {contents.map(content => (
                        <FileCard
                            key={content._id}
                            content={content}
                            cardToggleMenu={cardToggleMenu}
                            setCardToggleMenu={setCardToggleMenu}
                            onClick={() => handleCardClick(content)}
                        />
                    ))}
                </div>

                <AnimatePresence>
                    {expandedCardContent && (
                        <>
                            <motion.div
                                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            />

                            <ExpandedCard
                                content={expandedCardContent}
                                onClose={() => setExpandedCardContent(null)}
                                onSave={(updatedContent) => {
                                    setContents(
                                        prev => prev.map(content => content._id === updatedContent._id ?
                                            updatedContent : content)
                                    )
                                    setExpandedCardContent(null)
                                }
                                }

                            />
                        </>
                    )}
                </AnimatePresence>

                {newContentOpen &&
                    <NewContentModal
                        onClose={() => setNewContentOpen(false)}
                        brainId={brainId}
                        onSuccess={(newContent) => setContents((prev) => [newContent, ...prev])}
                    />
                }
            </main>
        </div >
    )
}
