import { useState } from "react";
import { X, Users, CheckCircle } from "lucide-react";

type Props = {
    onClose: () => void;
    onSuccess: (brain: { _id: string; name: string }) => void;
};

const JoinBrainModal = ({ onClose, onSuccess }: Props) => {
    const [token, setToken] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [joined, setJoined] = useState<{ name: string } | null>(null);

    const handleJoin = async () => {
        if (!token.trim()) {
            setError("Enter a token or link first.");
            return;
        }
        setLoading(true);
        const cleanToken = token.includes("/join/")
            ? token.split("/join/")[1]
            : token.trim();

        const authToken = localStorage.getItem("token");
        const res = await fetch(
            `http://localhost:3000/api/v1/brain/join/${cleanToken}`,
            {
                method: "POST",
                headers: { authorization: `Bearer ${authToken}` },
            }
        );
        setLoading(false);
        if (!res.ok) {
            setError("Invalid token. Check the link and try again.");
            return;
        }
        const data = await res.json();
        setJoined({ name: data.brain.name });
        onSuccess({ _id: data.brain._id, name: data.brain.name });
    };

    if (joined) {
        return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-[4px]">
                <div className="w-[420px] rounded-[16px] bg-[#F8F2EB] border border-white/50 p-7 shadow-[0_20px_60px_rgba(0,0,0,0.15)]">

                    <div className="flex justify-end mb-2">
                        <button onClick={onClose} className="text-[#777B80] hover:text-[#596579] cursor-pointer">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Success state */}
                    <div className="flex flex-col items-center py-4">
                        <div className="w-14 h-14 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mb-4">
                            <CheckCircle size={28} className="text-green-600" />
                        </div>
                        <h2 className="font-helvetica text-[18px] font-semibold text-[#17191C] mb-1">
                            Joined!
                        </h2>
                        <p className="font-helvetica text-[13px] text-[#687589] text-center mb-6">
                            You're now a member of {joined.name}.
                        </p>

                        {/* Green success banner */}
                        <div className="w-full flex items-center gap-2 bg-green-50 border border-green-200 rounded-[10px] px-3 py-2.5 mb-5">
                            <CheckCircle size={15} className="text-green-600 shrink-0" />
                            <p className="font-helvetica text-[13px] text-green-700">
                                You can now open and collaborate inside {joined.name}.
                            </p>
                        </div>

                        <button
                            onClick={onClose}
                            className="w-full h-[42px] rounded-[10px] bg-[#0033CC] font-helvetica text-[14px] text-white cursor-pointer hover:bg-[#0029A8]"
                        >
                            Open Brain
                        </button>
                    </div>

                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-[4px]">
            <div className="w-[420px] rounded-[16px] bg-[#F8F2EB] border border-white/50 p-7 shadow-[0_20px_60px_rgba(0,0,0,0.15)]">

                <div className="flex items-start justify-between mb-5">
                    <div>
                        <h2 className="font-helvetica text-[18px] font-semibold text-[#17191C]">
                            Join a Brain
                        </h2>
                        <p className="font-helvetica text-[13px] text-[#687589] mt-1">
                            Enter the invite token or link.
                        </p>
                    </div>
                    <button onClick={onClose} className="text-[#777B80] hover:text-[#596579] cursor-pointer">
                        <X size={20} />
                    </button>
                </div>

                <div className="mb-4">
                    <label className="font-helvetica text-[13px] text-[#596579] mb-1.5 block">
                        Invite token or link
                    </label>
                    <input
                        type="text"
                        value={token}
                        onChange={e => { setToken(e.target.value); setError(""); }}
                        placeholder="abc123xyz789lmno"
                        className="w-full h-[46px] rounded-[10px] border border-[#DDD5C6] bg-transparent px-4 font-helvetica text-[14px] text-[#17191C] outline-none focus:border-[#0066FF] placeholder:text-[#B4B2A9]"
                    />
                    {error && (
                        <p className="font-helvetica text-[13px] text-red-500 mt-1">{error}</p>
                    )}
                </div>

                <div className="flex items-start gap-2 bg-white/50 border border-[#DDD5C6] rounded-[10px] px-3 py-2.5 mb-5">
                    <Users size={15} className="text-[#777B80] shrink-0 mt-0.5" />
                    <p className="font-helvetica text-[12px] text-[#687589] leading-[1.5]">
                        Ask the Brain owner for the invite token or link.
                    </p>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={onClose}
                        className="flex-1 h-[42px] rounded-[10px] border border-[#DDD5C6] font-helvetica text-[14px] text-[#596579] cursor-pointer hover:bg-white/50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleJoin}
                        disabled={loading}
                        className="flex-1 h-[42px] rounded-[10px] bg-[#0033CC] font-helvetica text-[14px] text-white cursor-pointer hover:bg-[#0029A8] disabled:opacity-50"
                    >
                        {loading ? "Joining..." : "Join"}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default JoinBrainModal;