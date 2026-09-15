import { X } from "lucide-react";
import { useState } from "react";
import type { Content } from "../pages/files";
import { API_URL } from "../config/api";

type NewContentModalProps = {
    onClose: () => void;
    brainId: string | null;
    onSuccess: (newContent: Content) => void;
};

const NewContentModal = ({
    onClose,
    brainId,
    onSuccess
}: NewContentModalProps) => {

    const [contentType, setContentType] = useState<"link" | "note">("link");
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [note, setNote] = useState("");

    const handleSave = async () => {
        const token = localStorage.getItem("token");

        const body = contentType === "link" ?
            {
                link,
                brainId
            } : {
                note,
                title,
                brainId
            };

        const res = await fetch(`${API_URL}/api/v1/contents`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });
        if (!res.ok) {
            throw new Error("falied to create content")
        }
        const data = await res.json()
        console.log(data)
        onSuccess(data.content);
        onClose();
    }


    return (
        <div
            className="
                fixed
                inset-0
                z-[100]
                flex
                items-center
                justify-center
                bg-black/20
                backdrop-blur-[5px]
            "
        >

            <div
                className="
                    relative
                    w-[620px]
                    rounded-[22px]
                    bg-[#F8F2EB]
                    p-8
                    shadow-[0px_20px_60px_rgba(0,0,0,0.18)]
                "
            >

                <button
                    onClick={onClose}
                    className="
                        absolute
                        right-6
                        top-6
                        cursor-pointer
                    "
                >
                    <X size={20} />
                </button>

                <div>
                    <h1 className="font-nourd mb-3 text-[25px] font-semibold">New Content</h1>
                    <p className="font-helvetica text-[#687589]">Save a link or write a note. We'll automatically detect the type <br />
                        and generate a summary, title, tags and topics using AI.
                    </p>
                </div>

                <div className="mt-5 flex gap-3">

                    <button
                        onClick={() => setContentType("link")}
                        className={`
                            flex-1
                            h-[52px]
                            rounded-[10px]
                            border
                            font-helvetica
                            text-[14px]
                            cursor-pointer
                            ${contentType === "link"
                                ? "border-[#0066FF] bg-[#F4F7FF] text-[#0033CC]"
                                : "border-[#DDD5C6] text-[#555A62]"
                            }
                        `}
                    >
                        Link
                    </button>

                    <button
                        onClick={() => setContentType("note")}
                        className={`
                            flex-1
                            h-[52px]
                            rounded-[10px]
                            border
                            font-helvetica
                            text-[14px]
                            cursor-pointer
                            
                            ${contentType === "note"
                                ? "border-[#0066FF] bg-[#F4F7FF] text-[#0033CC]"
                                : "border-[#DDD5C6] text-[#555A62]"
                            }
                        `}
                    >
                        Note
                    </button>

                </div>

                {contentType === "note" && (
                    <>
                        <label className="font-helvetica" htmlFor="title">Title</label>
                        <input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Add a title..."
                            className="
                            mt-1
                        w-full
                        h-[52px]
                        rounded-[10px]
                        border
                        border-[#DDD5C6]
                        bg-transparent
                        px-4
                        font-helvetica
                        text-[14px]
                        outline-none
                        focus:border-[#0066FF]
                        font-noto
                        "
                        />
                    </>
                )}

                {contentType === "link" ?
                    (
                        <input
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            placeholder="Paste your link..."
                            className="newContentInputField"
                        />
                    ) : (
                        <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Write your note..."
                            className="newContentNote"
                        />
                    )}

                <div className="flex gap-2">
                    <button
                        onClick={handleSave}
                        className="
                    mt-6
                    w-[92px]
                    h-[42px]
                    rounded-[10px]
                    bg-[#0033CC]
                    text-white 
                    font-helvetica
                    text-[14px]
                    cursor-pointer
                    "
                    >
                        Save
                    </button>

                </div>

            </div>

        </div>
    );
};

export default NewContentModal;
