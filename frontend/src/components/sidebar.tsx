import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
    Folder,
    MessageCircle,
    ChevronDown,
    LogOut
} from "lucide-react";
import torrigate from "../assets/sidebar-logo/sidebar-logo.png"
import filesBackground from "../assets/background/files.png"
import { useAuth } from "../context/authContext";
import { motion } from "motion/react";
import { Connections } from "./connections";

export const Sidebar = () => {
    const { user, logout } = useAuth();

    const [accountOpen, setAccountOpen] = useState(false);
    const [connectionsOpen, setConnectionsOpen] = useState(false);

    const navItems = [
        { to: "/", label: "Conversations", icon: MessageCircle },
        { to: "/files", label: "Files", icon: Folder },
    ];

    return (
        <div
            style={{
                backgroundImage: `url(${filesBackground})`
            }}
            className="flex min-h-screen bg-no-repeat bg-cover bg-center">

            {/* Sidebar */}
            <motion.aside
                initial={{ x: -254, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="
                        w-[254px] h-screen flex-shrink-0
                        bg-[#F0E8DE]
                        border border-[#DDD5C6]
                        shadow-[5px_4px_17px_0_rgba(0,0,0,0.25)]
                        flex flex-col justify-between
                        px-5 py-8
                    "
            >
                <div>
                    <div className="mt-5 mb-10 flex flex-col items-center">
                        <span className="font-nour text-[28px] text-[#0033CC] mb-2">
                            olter
                        </span>
                        <img src={torrigate} alt="logo" className="w-30 h-30" />
                    </div>

                    <nav className="flex flex-col gap-3">
                        {navItems.map(({ to, label, icon: Icon }) => (
                            <NavLink key={to} to={to}
                                onClick={() => setConnectionsOpen(false)}
                                className={({ isActive }) =>
                                    `   relative
                                        flex items-center gap-2.5
                                        px-3 py-2.5
                                        rounded-xl
                                        overflow-hidden
                                        text-[14px]
                                        font-helvetica
                                        transition-colors
                                        ${(isActive && connectionsOpen == false)
                                        ? "text-[#0033CC] font-medium"
                                        : "text-[#596579] hover:bg-white/50"
                                    }`
                                }>
                                {({ isActive }) => (
                                    <>
                                        {(isActive && connectionsOpen == false) && (
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
                                        {(isActive && connectionsOpen == false) && (
                                            <span className="absolute left-0 top-0 h-full w-[3px] bg-[#0033CC] rounded-full" />
                                        )}

                                        <Icon
                                            size={17}
                                            strokeWidth={2}
                                            className="relative z-10"
                                        />

                                        <span className="relative z-10">
                                            {label}
                                        </span>
                                    </>
                                )}
                            </NavLink>
                        ))}

                        <Connections
                            isOpen={connectionsOpen}
                            onToggle={() => setConnectionsOpen(prev => !prev)}
                        />

                    </nav>
                </div>

                {/* Account */}
                <div className="relative">

                    {accountOpen && (
                        <div
                            className="
                                absolute bottom-full left-0 mb-2 w-full
                                bg-white
                                border border-[#5A5A5A]/15
                                rounded-xl
                                shadow-[0px_4px_16px_rgba(0,0,0,0.08)]
                                overflow-hidden
                            "
                        >
                            <button
                                onClick={logout}
                                className="
                                    w-full
                                    flex items-center gap-2
                                    px-3 py-2.5
                                    text-[13px]
                                    font-helvetica
                                    text-[#C0524A]
                                    hover:bg-[#eeece7]
                                "
                            >
                                <LogOut size={15} strokeWidth={2} />
                                Log out
                            </button>
                        </div>
                    )}


                    <div className="flex items-center gap-2 mb-5">
                        <div
                            className="
                                    w-7 h-7
                                    rounded-full
                                    bg-[#d8d3c4]
                                    flex items-center justify-center
                                    text-[12px]
                                    font-helvetica
                                    text-[#596579]
                                "
                        >
                            {user?.firstName?.[0]?.toUpperCase()}
                        </div>

                        <span className="text-[14px] font-helvetica text-[#596579]">
                            {user?.username}
                        </span>

                        <button
                            onClick={() => setAccountOpen(!accountOpen)}
                            className="ml-auto"
                        >
                            <ChevronDown
                                size={15}
                                strokeWidth={2}
                                className="text-[#596579] cursor-pointer
                            hover:bg-white/50
                            transition-colors
                            
                            "
                            />
                        </button>
                    </div>
                </div>
            </motion.aside>

            {/* Child route */}
            <main className="flex-1">
                <Outlet />
            </main>

        </div>
    );
};
