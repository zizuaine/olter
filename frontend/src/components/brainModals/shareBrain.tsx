import { useState } from "react";
import { X, Info, Copy, Check, Link } from "lucide-react";

type Props = {
    brainName: string;
    shareToken: string;
    onClose: () => void;
};

const ShareBrainModal = ({ brainName, shareToken, onClose }: Props) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).catch(() => { });
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-[4px]">
            <div className="w-[420px] rounded-[16px] bg-[#F8F2EB] border border-white/50 p-7 shadow-[0_20px_60px_rgba(0,0,0,0.15)]">

                <div className="flex items-start justify-between mb-5">
                    <div>
                        <h2 className="font-helvetica text-[18px] font-semibold text-[#17191C]">
                            Share Brain
                        </h2>
                        <p className="font-helvetica text-[13px] text-[#687589] mt-1">
                            Invite others to join {brainName}.
                        </p>
                    </div>
                    <button onClick={onClose} className="text-[#777B80] hover:text-[#596579] cursor-pointer">
                        <X size={20} />
                    </button>
                </div>

                <div className="mb-4">
                    <label className="font-helvetica text-[13px] text-[#596579] mb-1.5 block">
                        Invite token
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={shareToken}
                            readOnly
                            className="flex-1 h-[46px] rounded-[10px] border border-[#DDD5C6] bg-white/40 px-4 font-helvetica text-[14px] text-[#596579] outline-none"
                        />
                        <button
                            onClick={() => copyToClipboard(shareToken)}
                            className="h-[46px] px-4 rounded-[10px] border border-[#DDD5C6] bg-transparent font-helvetica text-[13px] text-[#596579] cursor-pointer hover:bg-white/50 flex items-center gap-1.5"
                        >
                            {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                            {copied ? "Copied" : "Copy"}
                        </button>
                    </div>
                </div>

                {/* Success banner */}
                {copied && (
                    <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-[10px] px-3 py-2.5 mb-4">
                        <Check size={15} className="text-green-600 shrink-0" />
                        <p className="font-helvetica text-[13px] text-green-700">
                            Copied! Invite link copied to clipboard.
                        </p>
                    </div>
                )}

                <div className="flex items-start gap-2 bg-white/50 border border-[#DDD5C6] rounded-[10px] px-3 py-2.5 mb-5">
                    <Info size={15} className="text-[#777B80] shrink-0 mt-0.5" />
                    <p className="font-helvetica text-[12px] text-[#687589] leading-[1.5]">
                        Share this token or link with people you trust. You can always regenerate it from settings.
                    </p>
                </div>

                <button
                    onClick={() => copyToClipboard(`olter.app/join/${shareToken}`)}
                    className="w-full h-[42px] rounded-[10px] bg-[#0033CC] font-helvetica text-[14px] text-white cursor-pointer hover:bg-[#0029A8] flex items-center justify-center gap-2 mb-2"
                >
                    <Link size={15} />
                    Copy invite link
                </button>
                <button
                    onClick={onClose}
                    className="w-full h-[42px] rounded-[10px] border border-[#DDD5C6] font-helvetica text-[14px] text-[#596579] cursor-pointer hover:bg-white/50"
                >
                    Done
                </button>

            </div>
        </div>
    );
};

export default ShareBrainModal;