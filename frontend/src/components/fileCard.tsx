import { MoreVertical } from "lucide-react";
import type { Content } from "../pages/files";
import { motion } from "framer-motion"

type FileCardProps = {
    content: Content;
    cardToggleMenu: string | null;
    setCardToggleMenu: React.Dispatch<React.SetStateAction<string | null>>;
    onClick: () => void

};

const FileCard = ({ content, cardToggleMenu, setCardToggleMenu, onClick }: FileCardProps) => {
    return (
        <motion.div
            layoutId={`content-card-${content._id}`}
            transition={{
                duration: 0.7,
                ease: "easeInOut"
            }}
            className="
                w-[380px]
                h-[295px]
                rounded-[22px]
                bg-[#F8F2EB]
                border border-white/50
                shadow-[0_5px_15px_rgba(0,0,0,0.08)]
                px-[20px]
                py-[20px]
                flex
                flex-col
                relative
                cursor-pointer
            "
            onClick={onClick}
        >
            {/* Top row */}
            <div className="flex items-center justify-between">

                {/* User */}
                <div className="flex items-center gap-3">

                    <div
                        className="
                            w-[32px]
                            h-[32px]
                            rounded-full
                            bg-[#E0DBD6]
                            flex
                            items-center
                            justify-center
                            text-[#3F4650]
                            font-helvetica
                            text-[18px]
                        "
                    >
                        {content.userId.username[0]}
                    </div>

                    <span
                        className="
                            font-helvetica
                            text-[15px]
                            text-[#30343B]
                        "
                    >
                        {content.userId.username}
                    </span>

                </div>

                {/*type + menu */}
                <div className="flex items-center gap-4">

                    <div
                        className="
                            px-[5px]
                            py-[3px]
                            rounded-[5px]
                            border
                            border-[#0066FF]
                            text-[#0055D9]
                            font-helvetica
                            text-[12px]
                            font-medium
                        "
                    >
                        {content.type}
                    </div>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setCardToggleMenu(
                                cardToggleMenu === content._id ? null : content._id
                            )
                        }
                        }
                        className="cursor-pointer text-[#3F4650]">
                        <MoreVertical size={24} strokeWidth={2} />
                    </button>
                    {cardToggleMenu === content._id && (
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
                            <button className="brainMenu-button">Edit</button>
                            <button className="brainMenu-button">Delete</button>
                        </div>
                    )}


                </div>

            </div>

            {/* Title */}
            <h2
                className="
                    mt-[20px]
                    font-helvetica
                    font-semibold
                    text-[22px]
                    leading-[1.2]
                    text-[#17191C]
                "
            >
                {content.title}
            </h2>

            {/* summary */}
            <p
                className="
                    mt-[14px]
                    font-noto
                    text-[14px]
                    leading-[1.4]
                    text-[#687589]
                "
            >
                {content.summary}
            </p>

            {/* Tags */}

            <div className="flex gap-[10px] mt-[17px] flex-wrap">
                {content.tags.map((tag) => (
                    <div
                        key={tag}
                        className="
                                    px-[7px]
                                    py-[4px]
                                    rounded-[5px]
                                    bg-[#E4E4EC]
                                    text-[#0033CC]
                                    font-helvetica
                                    text-[14px]
                                    font-medium
                                "
                    >
                        {tag}
                    </div>
                ))}
            </div>


            {/* Date */}
            <div className="flex justify-between">
                <span
                    className="
                absolute
                bottom-4
                font-helvetica
                text-[14px]
                text-[#777B80]
                "
                >
                    {new Date(content.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric"
                    })}
                </span>

                {content.embeddingStatus && (
                    <span
                        className="
                            absolute
                            bottom-4
                            right-5
                            font-helvetica
                            text-[11px]
                            capitalize
                            text-[#777B80]
                        "
                    >
                        status: {content.embeddingStatus}
                    </span>
                )}
            </div>

        </motion.div>
    );
};

export default FileCard;
