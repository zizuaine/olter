import type { Content } from "../pages/files";

type SourceCardProps = {
    source: Content;
};

const SourceCard = ({ source }: SourceCardProps) => {
    return (
        <article
            className="w-[260px] shrink-0 rounded-[12px] border border-white/50 bg-[#F8F2EB] px-4 py-4 shadow-[0_5px_15px_rgba(0,0,0,0.08)]"
        >
            <div className="flex items-center justify-between gap-3">
                <span className="rounded-[5px] border border-[#0066FF] px-[5px] py-[3px] font-helvetica text-[12px] font-medium text-[#0055D9]">
                    {source.type}
                </span>
                <span className="font-helvetica text-[12px] text-[#777B80]">
                    Source
                </span>
            </div>

            <h3 className="mt-4 line-clamp-2 font-helvetica text-[17px] font-semibold leading-[1.2] text-[#17191C]">
                {source.title ?? "Untitled source"}
            </h3>

            {source.summary && (
                <p className="mt-2 line-clamp-3 font-noto text-[13px] leading-[1.4] text-[#687589]">
                    {source.summary}
                </p>
            )}

            {source.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                    {source.tags.slice(0, 3).map((tag) => (
                        <span
                            key={tag}
                            className="rounded-[5px] bg-[#E4E4EC] px-[7px] py-[4px] font-helvetica text-[12px] font-medium text-[#0033CC]"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}
        </article>
    );
};

export default SourceCard;
