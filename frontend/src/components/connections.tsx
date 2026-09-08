import { motion } from "framer-motion";
import {
    Users, ChevronDown, MoreVertical, Share2, Pencil, LogOut,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { useBrain } from "../context/brainContext";


type ConnectionsProps = {
    isOpen: boolean;
    onToggle: () => void;
};



export const Connections = ({ isOpen, onToggle }: ConnectionsProps) => {
    const isActive = isOpen;
    const { user } = useAuth();
    const { selectedBrain, setSelectedBrain, brains, allBrains } = useBrain();
    console.log(allBrains)

    const [openBrainMenu, setOpenBrainMenu] = useState<string | null>(null);

    return (
        <div>
            <button
                className={`
                        relative
                        w-full
                        flex items-center gap-2.5
                        px-3 py-2.5
                        rounded-xl
                        overflow-hidden
                        text-[14px]
                        font-helvetica
                        transition-colors
                        cursor-pointer
                        ${isActive
                        ? "text-[#0033CC] font-medium"
                        : "text-[#596579] hover:bg-white/50"
                    }
                    `}
                onClick={onToggle}
            >
                {isActive && (
                    <motion.div
                        layoutId="activeNav"
                        className="
                                absolute inset-0
                                rounded-xl
                                bg-[#E5E4EA]
                            "
                        transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 10
                        }}
                    />
                )}
                {isActive && (
                    <span className="absolute left-0 top-0 h-full w-[3px] bg-[#0033CC] rounded-full" />
                )}

                <Users size={17} strokeWidth={2} className="relative z-10" />

                <span className="relative z-10">
                    Connections
                </span>

                <ChevronDown
                    size={15}
                    className={`
                            relative z-10 ml-auto
                            transition-transform
                            ${isActive ? "rotate-180" : ""}
                        `}
                />
            </button>

            {
                isActive && (
                    <div className="mt-1 p2 rounded-xl bg-[#FDFBF7] shadow-[0px_4px_16px_rgba(0,0,0,0.10)]">


                        <div className="flex flex-col">
                            {allBrains.map((brain) => (
                                <div key={brain._id}
                                    className="relative flex items-center">
                                    <button
                                        onClick={() => setSelectedBrain(brain._id)}
                                        className={`
                                            flex-1
                                            flex items-center
                                            px-8 py-2
                                            rounded-lg
                                            text-[12px]
                                            font-helvetica
                                            text-left
                                            transition-colors
                                            cursor-pointer
                                            ${selectedBrain === brain._id
                                                ? " text-[#0033CC]"
                                                : "text-[#3F4650] hover:bg-/50"
                                            }
                                    `}
                                    >
                                        {brain.name}
                                    </button>

                                    {selectedBrain === brain._id && (
                                        <span className="
                                                    absolute
                                                    right-6
                                                    w-[6px]
                                                    h-[6px]
                                                    rounded-full
                                                    bg-[#0033CC]
                                                " />
                                    )}
                                    {brain._id !== "personal" && <button
                                        onClick={() =>
                                            setOpenBrainMenu(
                                                openBrainMenu === brain._id
                                                    ? null
                                                    : brain._id
                                            )
                                        }
                                        className="
                                            ml-1
                                            p-1
                                            rounded-md
                                            text-[#596579]
                                            hover:bg-white/60
                                            transition-colors
                                            cursor-pointer
                                        "
                                    >
                                        <MoreVertical
                                            size={15}
                                            strokeWidth={2}
                                        />
                                    </button>}
                                    {openBrainMenu === brain._id && (
                                        <div className="
                                                    absolute
                                                    left-[208px]
                                                    top-[-1px]
                                                    w-[125px]
                                                    bg-white
                                                    border border-[#DDD5C6]
                                                    rounded-xl
                                                    shadow-[0px_4px_16px_rgba(0,0,0,0.10)]
                                                    p-1
                                                    z-50
                                                "
                                        >
                                            {brain.ownerId === user?._id && (
                                                <>
                                                    <button
                                                        className="brainMenu-button"
                                                    >
                                                        <Share2 size={14} strokeWidth={2} />
                                                        Share Brain
                                                    </button>
                                                    <button
                                                        className="brainMenu-button"
                                                    >
                                                        <Pencil size={14} strokeWidth={2} />
                                                        Rename
                                                    </button>
                                                </>
                                            )}

                                            <button className="brainMenu-button">
                                                <LogOut size={14} strokeWidth={2} />
                                                Leave Brain
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mx-2 my-2 border-t border-[#DDD5C6]" />

                        <button
                            className="
                                    w-full
                                    flex items-center gap-2
                                    px-4 py-2
                                    text-[12px]
                                    font-helvetica
                                    text-[#0033CC]
                                    hover:bg-[#E8EDFF]
                                    rounded-lg
                                    transition-colors
                                    text-left
                                    cursor-pointer
                                "
                        >
                            <span className="text-[18px] font-light leading-none">+</span>
                            Create Brain
                        </button>

                        <button
                            className="
                                    w-full
                                    flex items-center gap-2
                                    px-4 py-2
                                    text-[12px]
                                    font-helvetica
                                    text-[#0033CC]
                                    hover:bg-[#E8EDFF]
                                    rounded-lg
                                    transition-colors
                                    text-left
                                    cursor-pointer
                                    
                                "
                        >
                            <span className="text-[18px] font-light leading-none">+</span>
                            Join Brain
                        </button>
                    </div>
                )
            }
        </div>
    )
}
