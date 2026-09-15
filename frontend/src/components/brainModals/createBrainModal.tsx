import { useState } from "react";
import { X, Info, Check } from "lucide-react";
import { API_URL } from "../../config/api";

type Props = {
    onClose: () => void;
    onSuccess: (brain: { _id: string; name: string, ownerId: string, shareToken: string }) => void;
};

const CreateBrainModal = ({ onClose, onSuccess }: Props) => {
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleCreate = async () => {
        if (!name.trim()) {
            setError("Enter a name first.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const token = localStorage.getItem("token");

            const res = await fetch(
                `${API_URL}/api/v1/brain`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        brainName: name.trim(),
                    }),
                }
            );

            if (!res.ok) {
                setError("Failed to create brain. Please try again.");
                return;
            }

            const data = await res.json();

            onSuccess({
                _id: data.brain._id,
                name: data.brain.name,
                ownerId: data.brain.ownerId,
                shareToken: data.token,
            });

            setSuccess(true);

        } catch (error) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-[4px]">
            <div className="w-[420px] rounded-[16px] bg-[#F8F2EB] border border-white/50 p-7 shadow-[0_20px_60px_rgba(0,0,0,0.15)]">

                {success ? (
                    /* ───────────── SUCCESS ───────────── */
                    <div className="flex flex-col items-center text-center py-5">

                        <div className="w-16 h-16 rounded-full border-2 border-green-500 flex items-center justify-center mb-5">
                            <Check
                                size={30}
                                strokeWidth={2}
                                className="text-green-500"
                            />
                        </div>

                        <h2 className="font-helvetica text-[18px] font-semibold text-[#17191C]">
                            Brain created successfully!
                        </h2>

                        <p className="font-helvetica text-[13px] text-[#687589] mt-2">
                            <span className="font-medium text-[#17191C]">
                                {name.trim()}
                            </span>{" "}
                            is ready to use.
                        </p>

                        <button
                            onClick={onClose}
                            className="
                                mt-7
                                w-full
                                h-[42px]
                                rounded-[10px]
                                bg-[#0033CC]
                                font-helvetica
                                text-[14px]
                                text-white
                                cursor-pointer
                                hover:bg-[#0029A8]
                            "
                        >
                            Done
                        </button>

                    </div>
                ) : (
                    /* ───────────── CREATE FORM ───────────── */
                    <>
                        <div className="flex items-start justify-between mb-5">
                            <div>
                                <h2 className="font-helvetica text-[18px] font-semibold text-[#17191C]">
                                    Create a Brain
                                </h2>

                                <p className="font-helvetica text-[13px] text-[#687589] mt-1">
                                    Give your shared knowledge base a name.
                                </p>
                            </div>

                            <button
                                onClick={onClose}
                                className="text-[#777B80] hover:text-[#596579] cursor-pointer"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="mb-4">
                            <label className="font-helvetica text-[13px] text-[#596579] mb-1.5 block">
                                Brain name
                            </label>

                            <input
                                type="text"
                                value={name}
                                onChange={e => {
                                    setName(e.target.value);
                                    setError("");
                                }}
                                placeholder="e.g. Research team, Design resources"
                                className="
                                    w-full
                                    h-[46px]
                                    rounded-[10px]
                                    border
                                    border-[#DDD5C6]
                                    bg-transparent
                                    px-4
                                    font-helvetica
                                    text-[14px]
                                    text-[#17191C]
                                    outline-none
                                    focus:border-[#0066FF]
                                    placeholder:text-[#B4B2A9]
                                "
                            />

                            {error && (
                                <p className="font-helvetica text-[13px] text-red-500 mt-1">
                                    {error}
                                </p>
                            )}
                        </div>

                        <div className="flex items-start gap-2 bg-white/50 border border-[#DDD5C6] rounded-[10px] px-3 py-2.5 mb-5">
                            <Info
                                size={15}
                                className="text-[#777B80] shrink-0 mt-0.5"
                            />

                            <p className="font-helvetica text-[12px] text-[#687589] leading-[1.5]">
                                Anyone you invite can save content and search the
                                shared knowledge base. You can share the invite
                                link after creating.
                            </p>
                        </div>

                        <div className="flex gap-2">

                            <button
                                onClick={onClose}
                                className="
                                    flex-1
                                    h-[42px]
                                    rounded-[10px]
                                    border
                                    border-[#DDD5C6]
                                    font-helvetica
                                    text-[14px]
                                    text-[#596579]
                                    cursor-pointer
                                    hover:bg-white/50
                                "
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleCreate}
                                disabled={loading}
                                className="
                                    flex-1
                                    h-[42px]
                                    rounded-[10px]
                                    bg-[#0033CC]
                                    font-helvetica
                                    text-[14px]
                                    text-white
                                    cursor-pointer
                                    hover:bg-[#0029A8]
                                    disabled:opacity-50
                                "
                            >
                                {loading ? "Creating..." : "Create Brain"}
                            </button>

                        </div>
                    </>
                )}

            </div>
        </div>
    );
};

export default CreateBrainModal;