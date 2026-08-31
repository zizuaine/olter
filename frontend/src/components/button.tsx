type ButtonProps = {
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    type?: "button" | "submit"
}

function Button({ children, onClick, type = "button" }: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            className="
        inline-flex items-center justify-center
        gap-2
        h-10 w-26 px-2
        rounded-xl
        border border-[#0033CC]
        bg-transparent
        text-[#0033CC]
        text-[15px] 
        font-helvetica
        transition-shadow duration-200
        hover:shadow-[5px_6px_9px_rgba(0,0,0,0.12)]
        cursor-pointer
        mx-auto
      "
        >
            {children}
        </button>
    );
}

export default Button;