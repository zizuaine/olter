import type { Content } from "../pages/files";
import { X } from "lucide-react";
import { motion } from "framer-motion"
import { useState } from "react";
import {
    User,
    CalendarDays,
    Clock3,
    FileText,
    HardDrive,
} from "lucide-react";
import { API_URL } from "../config/api";

type ExpandedCardProps = {
    content: Content;
    onClose: () => void;
    onSave: (content: Content) => void
}

const ExpandedCard = ({ content, onClose, onSave }: ExpandedCardProps) => {

    const [title, setTitle] = useState<string | null>(content.title ?? "")
    const [summary, setSummary] = useState<string | null>(content.summary ?? "")
    const [contentText, setContentText] = useState<string | null>(content.content ?? "")

    const handleSave = async () => {
        const token = localStorage.getItem("token");

        const res = await fetch(
            `${API_URL}/api/v1/contents/${content._id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    title,
                    summary,
                    content: contentText
                })
            }
        );

        if (!res.ok) {
            // handle error
            return;
        }

        const data = await res.json();

        onSave(data.content);
    }


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">


            <motion.div
                layoutId={`content-card-${content._id}`}
                transition={{
                    duration: 0.7,
                    ease: "easeInOut"
                }}
                className="relative flex w-[830px] h-[730px] max-h-[85vh] overflow-hidden rounded-2xl rounded-[22px]
                bg-[#F8F2EB] shadow-[0px_20px_60px_rgba(0,0,0,0.18)]
                border border-white/50">

                {/* Left — editable content */}
                <div className="flex min-w-0 flex-1 flex-col p-7">

                    {/* Top bar */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
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
                        </div>

                        {/* Close */}
                        <button
                            className="cursor-pointer"
                            onClick={onClose}
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Editable fields */}
                    <div className="mt-6 flex flex-col gap-5">

                        {/* Title */}
                        <div className="flex flex-col gap-2">
                            <label className="expanded-label">Title</label>
                            <input className="expanded-input"
                                value={title ?? ""}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        {/* summary */}
                        <div className="flex flex-col gap-2">
                            <label className="expanded-label">Description</label>
                            <input
                                className="expanded-input"
                                value={summary ?? ""}
                                onChange={(e) => setSummary(e.target.value)}
                            />
                        </div>

                        {/* Tags */}
                        <div className="flex flex-col gap-2">
                            <label className="expanded-label">Tags</label>
                            <div className="flex flex-wrap gap-2">
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
                                )
                                )}
                            </div>
                        </div>


                        {/* Content */}
                        <div className="flex min-h-0 flex-1 flex-col gap-2">
                            <label className="expanded-label">Content</label>

                            <textarea
                                className="expanded-textarea"
                                value={contentText ?? ""}
                                onChange={(e) => setContentText(e.target.value)}
                            />
                        </div>

                    </div>
                </div>


                {/* Right — file information */}
                <div className="flex w-[270px] shrink-0 flex-col border-l p-7">

                    {/* Details */}
                    <div className="mt-8 border-t pt-6">
                        <h3 className="font-helvetica text-[#777B80]">Details</h3>

                        <div className="mt-5 flex flex-col gap-5">
                            {/* Owner */}
                            <div className="detail-item">
                                <div className="detail-icon">
                                    <User size={20} strokeWidth={1.7} />
                                </div>

                                <div className="detail-content">
                                    <span className="detail-label">Owner</span>
                                    <span className="detail-value">{content.userId.username}</span>
                                </div>
                            </div>
                            {/* Created */}
                            <div className="detail-item">
                                <div className="detail-icon">
                                    <CalendarDays size={20} strokeWidth={1.7} />
                                </div>

                                <div className="detail-content">
                                    <span className="detail-label">Created</span>
                                    <span className="detail-value">
                                        {new Date(content.createdAt).toLocaleDateString("en-US", {
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric"
                                        })}
                                    </span>
                                </div>
                            </div>
                            {/* Last modified */}
                            <div className="detail-item">
                                <div className="detail-icon">
                                    <Clock3 size={20} strokeWidth={1.7} />
                                </div>

                                <div className="detail-content">
                                    <span className="detail-label">Last modified</span>
                                    <span className="detail-value">
                                        {new Date(content.updatedAt).toLocaleDateString("en-US", {
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric"
                                        })}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Actions */}
                    <div className="mt-auto flex items-center justify-end gap-3 pt-6">
                        <div className="card-actions">

                            <button
                                onClick={onClose}
                                className="cancel-button">
                                Cancel
                            </button>

                            <button
                                onClick={handleSave}
                                className="save-button">
                                Save
                            </button>

                        </div>
                    </div>

                </div>

            </motion.div>
        </div>
    )
}

export default ExpandedCard;