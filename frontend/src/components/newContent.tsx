import { X, Upload, File } from "lucide-react";
import { useState, useRef } from "react";
import type { Content } from "../pages/files";
import { API_URL } from "../config/api";

type ContentType = "link" | "note" | "pdf";

type NewContentModalProps = {
    onClose: () => void;
    brainId: string | null;
    onSuccess: (newContent: Content) => void;
};

const NewContentModal = ({ onClose, brainId, onSuccess }: NewContentModalProps) => {
    const [contentType, setContentType] = useState<ContentType>("link");
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [note, setNote] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFile = (f: File | null) => {
        if (!f || f.type !== "application/pdf") return;
        setFile(f);
    };

    const clearFile = () => {
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSave = async () => {
        const token = localStorage.getItem("token");
        setLoading(true);

        try {
            let res: Response;

            if (contentType === "pdf" && file) {
                const formData = new FormData();
                formData.append("document", file);
                if (brainId) formData.append("brainId", brainId ?? "");

                res = await fetch(`${API_URL}/api/v1/contents`, {
                    method: "POST",
                    headers: { authorization: `Bearer ${token}` },
                    body: formData,
                });
            } else {
                const body =
                    contentType === "link"
                        ? { link, brainId }
                        : { note, title, brainId };

                res = await fetch(`${API_URL}/api/v1/contents`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(body),
                });
            }

            if (!res.ok) throw new Error("Failed to save content");
            const data = await res.json();
            onSuccess(data.content);
            onClose();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const tabs: { key: ContentType; label: string }[] = [
        { key: "link", label: "Link" },
        { key: "note", label: "Note" },
        { key: "pdf", label: "PDF" },
    ];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-[5px]">
            <div className="relative w-[580px] rounded-[22px] bg-[#F8F2EB] p-8 shadow-[0px_20px_60px_rgba(0,0,0,0.18)]">

                <button onClick={onClose} className="absolute right-6 top-6 cursor-pointer text-[#777B80] hover:text-[#596579]">
                    <X size={20} />
                </button>

                <h1 className="font-helvetica mb-1.5 text-[22px] font-semibold text-[#17191C]">
                    New content
                </h1>
                <p className="font-helvetica mb-5 text-[13px] text-[#687589] leading-[1.5]">
                    Save a link, write a note, or upload a PDF. We'll generate a summary,
                    title, tags and topics using AI.
                </p>

                {/* Tabs */}
                <div className="mb-5 flex gap-2.5">
                    {tabs.map(({ key, label }) => (
                        <button
                            key={key}
                            onClick={() => setContentType(key)}
                            className={`flex-1 h-[48px] rounded-[10px] border font-helvetica text-[13px] cursor-pointer transition-all
                ${contentType === key
                                    ? "border-[#0066FF] bg-[#F4F7FF] text-[#0033CC]"
                                    : "border-[#DDD5C6] text-[#555A62]"
                                }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {/* Link tab */}
                {contentType === "link" && (
                    <input
                        value={link}
                        onChange={e => setLink(e.target.value)}
                        placeholder="Paste your link..."
                        className="w-full h-[48px] rounded-[10px] border border-[#DDD5C6] bg-transparent px-4 font-helvetica text-[14px] text-[#17191C] outline-none focus:border-[#0066FF] placeholder:text-[#B4B2A9]"
                    />
                )}

                {/* Note tab */}
                {contentType === "note" && (
                    <div className="flex flex-col gap-3">
                        <div>
                            <label className="font-helvetica text-[13px] text-[#596579] mb-1.5 block">
                                Title
                            </label>
                            <input
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                placeholder="Add a title..."
                                className="w-full h-[48px] rounded-[10px] border border-[#DDD5C6] bg-transparent px-4 font-helvetica text-[14px] text-[#17191C] outline-none focus:border-[#0066FF] placeholder:text-[#B4B2A9]"
                            />
                        </div>
                        <textarea
                            value={note}
                            onChange={e => setNote(e.target.value)}
                            placeholder="Write your note..."
                            className="w-full min-h-[120px] rounded-[10px] border border-[#DDD5C6] bg-transparent px-4 py-3 font-helvetica text-[14px] text-[#17191C] outline-none focus:border-[#0066FF] placeholder:text-[#B4B2A9] resize-none"
                        />
                    </div>
                )}

                {/* PDF tab */}
                {contentType === "pdf" && (
                    <div className="pdfUploadContainer">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf"
                            className="pdfFileInput"
                            onChange={e => handleFile(e.target.files?.[0] ?? null)}
                        />

                        {!file ? (
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                onDragOver={e => {
                                    e.preventDefault();
                                    setIsDragging(true);
                                }}
                                onDragLeave={() => setIsDragging(false)}
                                onDrop={e => {
                                    e.preventDefault();
                                    setIsDragging(false);
                                    handleFile(e.dataTransfer.files[0] ?? null);
                                }}
                                className={`pdfDropZone ${isDragging ? "pdfDropZoneDragging" : ""}`}
                            >
                                <Upload
                                    size={28}
                                    className={`pdfUploadIcon ${isDragging ? "pdfUploadIconDragging" : ""
                                        }`}
                                />

                                <p className="pdfDropText">
                                    Drop your PDF here or click to browse
                                </p>

                                <p className="pdfDropHint">
                                    PDF only · max 10 MB
                                </p>
                            </div>
                        ) : (
                            <div className="selectedPdf">
                                <File className="selectedPdfIcon" size={18} />

                                <span className="selectedPdfName">
                                    {file.name}
                                </span>

                                <button
                                    onClick={clearFile}
                                    className="removePdfButton"
                                    aria-label="Remove file"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        )}
                    </div>
                )}

                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="mt-5 h-[42px] w-[92px] rounded-[10px] bg-[#0033CC] font-helvetica text-[14px] text-white cursor-pointer hover:bg-[#0029A8] disabled:opacity-50"
                >
                    {loading ? "Saving..." : "Save"}
                </button>

            </div>
        </div>
    );
};

export default NewContentModal;
