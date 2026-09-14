import { motion } from "framer-motion";
import {
    Users,
    ChevronDown,
    MoreVertical,
    Share2,
    Pencil,
    LogOut,
    Trash2,
    Plus
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { useBrain } from "../context/brainContext";
import CreateBrainModal from "./brainModals/createBrainModal";
import JoinBrainModal from "./brainModals/joinBrain";
import ShareBrainModal from "./brainModals/shareBrain";
import type { Brain } from "../context/brainContext";

type ConnectionsProps = {
    isOpen: boolean;
    onToggle: () => void;
};

type ShareBrain = Brain & {
    shareToken: string;
}

export const Connections = ({ isOpen, onToggle }: ConnectionsProps) => {
    const { user } = useAuth();
    const { selectedBrain, setSelectedBrain, allBrains, addBrain, removeBrain } = useBrain();

    const [openBrainMenu, setOpenBrainMenu] = useState<string | null>(null);
    const [createBrainModal, setCreateBrainModal] = useState(false);
    const [joinBrainModal, setJoinBrainModal] = useState(false);
    const [shareBrain, setShareBrain] = useState<ShareBrain | null>(null);

    useEffect(() => {
        const handleClick = () => setOpenBrainMenu(null);
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, []);

    const deleteBrain = async (id: string): Promise<void> => {
        if (!id) return;
        const token = localStorage.getItem("token");

        try {
            const res = await fetch(`http://localhost:3000/api/v1/brain/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) return;

            removeBrain(id);
            if (selectedBrain === id) setSelectedBrain("personal");
        } catch (error) {
            console.error("Failed to delete brain:", error);
        }
    };

    return (
        <div>
            <button
                className={`
          relative w-full flex items-center gap-2.5 px-3 py-2.5
          rounded-xl overflow-hidden text-[14px] font-helvetica
          transition-colors cursor-pointer
          ${isOpen ? "text-[#0033CC] font-medium" : "text-[#596579] hover:bg-white/50"}
        `}
                onClick={onToggle}
            >
                {isOpen && (
                    <>
                        <motion.div
                            layoutId="activeNav"
                            className="absolute inset-0 rounded-xl bg-[#E5E4EA]"
                            transition={{ type: "spring", stiffness: 500, damping: 10 }}
                        />
                        <span className="absolute left-0 top-0 h-full w-[3px] bg-[#0033CC] rounded-full" />
                    </>
                )}

                <Users size={17} strokeWidth={2} className="relative z-10" />
                <span className="relative z-10">Connections</span>
                <ChevronDown
                    size={15}
                    className={`relative z-10 ml-auto transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
            </button>

            {isOpen && (
                <div className="mt-1 p-2 rounded-xl bg-[#FDFBF7] shadow-[0px_4px_16px_rgba(0,0,0,0.10)]">
                    <div className="flex flex-col gap-0.5">
                        {allBrains.map((brain) => (
                            <div key={brain._id} className="relative flex items-center">
                                <button
                                    onClick={() => setSelectedBrain(brain._id)}
                                    className={`
                    flex-1 flex items-center px-3 py-2 rounded-lg text-[12px]
                    font-helvetica text-left transition-colors cursor-pointer truncate
                    ${selectedBrain === brain._id
                                            ? "text-[#0033CC] font-medium"
                                            : "text-[#3F4650] hover:bg-black/5"
                                        }
                  `}
                                >
                                    {brain.name}
                                </button>

                                {selectedBrain === brain._id && (
                                    <span className="w-[6px] h-[6px] rounded-full bg-[#0033CC] mr-2 shrink-0" />
                                )}

                                {brain._id !== "personal" && (
                                    <div className="relative">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setOpenBrainMenu(openBrainMenu === brain._id ? null : brain._id);
                                            }}
                                            className="p-1 rounded-md text-[#596579] hover:bg-white/60 transition-colors cursor-pointer"
                                        >
                                            <MoreVertical size={15} strokeWidth={2} />
                                        </button>

                                        {openBrainMenu === brain._id && (
                                            <div
                                                onClick={(e) => e.stopPropagation()}
                                                className="
                          absolute right-0 top-full mt-1 w-32 bg-white
                          border border-[#DDD5C6] rounded-xl
                          shadow-[0px_4px_16px_rgba(0,0,0,0.10)] p-1 z-50
                          text-[#3F4650]
                        "
                                            >
                                                {brain.ownerId === user?._id ? (
                                                    <>
                                                        <button
                                                            className="brainMenu-button"

                                                            onClick={async () => {
                                                                const token = localStorage.getItem("token");
                                                                const res = await fetch(`http://localhost:3000/api/v1/brain/${brain._id}`, {
                                                                    method: "GET",
                                                                    headers: { authorization: `Bearer ${token}` }
                                                                })
                                                                const data = await res.json();
                                                                setShareBrain({ ...brain, shareToken: data.shareToken })
                                                            }}
                                                        >
                                                            <Share2 size={14} strokeWidth={2} />
                                                            Share Brain
                                                        </button>


                                                        <button className="brainMenu-button">
                                                            <Pencil size={14} strokeWidth={2} />
                                                            Rename
                                                        </button>
                                                        <button
                                                            onClick={() => deleteBrain(brain._id)}
                                                            className="brainMenu-button text-red-600 hover:text-red-700"
                                                        >
                                                            <Trash2 size={14} strokeWidth={2} />
                                                            Delete Brain
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button className="brainMenu-button">
                                                        <LogOut size={14} strokeWidth={2} />
                                                        Leave Brain
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mx-2 my-2 border-t border-[#DDD5C6]" />

                    <button
                        onClick={() => setCreateBrainModal(true)}
                        className="w-full flex items-center gap-2 px-3 py-2 text-[12px] font-helvetica text-[#0033CC] hover:bg-[#E8EDFF] rounded-lg transition-colors cursor-pointer"
                    >
                        <Plus size={14} />
                        Create Brain
                    </button>

                    <button
                        onClick={() => setJoinBrainModal(true)}
                        className="w-full flex items-center gap-2 px-3 py-2 text-[12px] font-helvetica text-[#0033CC] hover:bg-[#E8EDFF] rounded-lg transition-colors cursor-pointer"
                    >
                        <Plus size={14} />
                        Join Brain
                    </button>

                    {createBrainModal && (
                        <CreateBrainModal
                            onClose={() => setCreateBrainModal(false)}
                            onSuccess={(brain) => {
                                addBrain({
                                    _id: brain._id,
                                    name: brain.name,
                                    ownerId: brain.ownerId,
                                })
                                setCreateBrainModal(false);
                                setShareBrain(shareBrain);
                            }}
                        />
                    )}

                    {joinBrainModal && (
                        <JoinBrainModal
                            onClose={() => setJoinBrainModal(false)}
                            onSuccess={(brain) => {
                                addBrain(brain)
                                setJoinBrainModal(false);
                            }}
                        />
                    )}

                    {shareBrain && (
                        <ShareBrainModal
                            brainName={shareBrain.name}
                            shareToken={shareBrain.shareToken}
                            onClose={() => setShareBrain(null)}
                        />
                    )}

                </div>
            )
            }
        </div >
    );
};