import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
    Folder,
    MessageCircle,
    ChevronDown,
    LogOut,
    Plus
} from "lucide-react";
import torrigate from "../assets/sidebar-logo/olter-torii.svg";
import { useAuth } from "../context/authContext";
import { motion } from "motion/react";
import { Connections } from "./connections";
import { useChats } from "../context/chatContext";

export const Sidebar = () => {
    const { user, logout } = useAuth();
    const { chats } = useChats();

    const [accountOpen, setAccountOpen] = useState(false);
    const [connectionsOpen, setConnectionsOpen] = useState(false);

    const navItems = [
        { to: "/", label: "New", icon: Plus },
        { to: "/files", label: "Files", icon: Folder },
    ];

    return (
        <div className="flex h-screen overflow-hidden">

            {/* Sidebar */}
            <motion.aside
                initial={{ x: -254, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="
                    w-[254px]
                    h-screen
                    flex-shrink-0
                    z-20
                    bg-[#F0E8DE]
                    border border-[#DDD5C6]
                    shadow-[5px_4px_17px_0_rgba(0,0,0,0.25)]
                    flex flex-col
                    px-5
                    py-5
                    overflow-hidden
                "
            >

                {/* Top section */}
                <div className="flex-1 min-h-0 flex flex-col">

                    {/* Logo */}
                    <div className="mt-1 mb-5 flex flex-col items-center shrink-0">
                        <span className="font-nour text-[28px] text-[#0033CC] mb-0">
                            olter
                        </span>

                        <img
                            src={torrigate}
                            alt="logo"
                            className="w-30 h-25"
                        />
                    </div>

                    {/* Navigation */}
                    <nav className="flex flex-col gap-3 shrink-0">

                        {navItems.map(({ to, label, icon: Icon }) => (
                            <NavLink
                                key={to}
                                to={to}
                                onClick={() => setConnectionsOpen(false)}
                                className={({ isActive }) =>
                                    `
                                    relative
                                    flex items-center gap-2.5
                                    px-3 py-2.5
                                    rounded-xl
                                    overflow-hidden
                                    text-[14px]
                                    font-helvetica
                                    transition-colors
                                    ${isActive && connectionsOpen === false
                                        ? "text-[#0033CC] font-medium"
                                        : "text-[#596579] hover:bg-white/50"
                                    }
                                    `
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        {/* Active background */}
                                        {isActive && connectionsOpen === false && (
                                            <motion.div
                                                layoutId="activeNav"
                                                className="
                                                    absolute
                                                    inset-0
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

                                        {/* Active indicator */}
                                        {isActive && connectionsOpen === false && (
                                            <span
                                                className="
                                                    absolute
                                                    left-0
                                                    top-0
                                                    h-full
                                                    w-[3px]
                                                    bg-[#0033CC]
                                                    rounded-full
                                                "
                                            />
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

                        {/* Connections */}
                        <Connections
                            isOpen={connectionsOpen}
                            onToggle={() =>
                                setConnectionsOpen(prev => !prev)
                            }
                        />

                    </nav>

                    {/* Chats */}
                    {chats.length > 0 && (
                        <div className="flex-1 min-h-0 flex flex-col">

                            {/* Chats heading */}
                            <div className="flex items-center mt-4 gap-2 pl-2 shrink-0">
                                <MessageCircle
                                    size={17}
                                    strokeWidth={2}
                                    className="text-[#596579]"
                                />

                                <h2 className="font-helvetica text-[#596579] text-[14px]">
                                    chats
                                </h2>
                            </div>

                            {/* Chat list */}
                            <div className="relative flex-1 min-h-0">

                                <div
                                    className="
                    h-full
                    overflow-y-auto
                    px-1
                    pt-2
                    pb-2
                    flex
                    flex-col
                    gap-1
                "
                                >
                                    {chats.map(chat => (
                                        <NavLink
                                            key={chat._id}
                                            to={`/chat/${chat._id}`}
                                            className={({ isActive }) =>
                                                `
                            shrink-0
                            px-3
                            py-2
                            rounded-xl
                            text-[13px]
                            font-helvetica
                            truncate
                            ${isActive
                                                    ? "text-[#0033CC] bg-[#E5E4EA]"
                                                    : "text-[#596579] hover:bg-white/50"
                                                }
                            `
                                            }
                                        >
                                            {chat.title}
                                        </NavLink>
                                    ))}
                                </div>

                            </div>

                        </div>
                    )}

                </div>

                {/* Account */}
                <div className="relative shrink-0">

                    {/* Account popup */}
                    {accountOpen && (
                        <div
                            className="
                                absolute
                                bottom-full
                                left-0
                                mb-2
                                w-full
                                bg-white
                                border
                                border-[#5A5A5A]/15
                                rounded-xl
                                shadow-[0px_4px_16px_rgba(0,0,0,0.08)]
                                overflow-hidden
                            "
                        >
                            <button
                                onClick={logout}
                                className="
                                    w-full
                                    flex
                                    items-center
                                    gap-2
                                    px-3
                                    py-2.5
                                    text-[13px]
                                    font-helvetica
                                    text-[#C0524A]
                                    hover:bg-[#eeece7]
                                "
                            >
                                <LogOut
                                    size={15}
                                    strokeWidth={2}
                                />

                                Log out
                            </button>
                        </div>
                    )}

                    {/* Account row */}
                    <div className="flex items-center gap-2">

                        {/* Avatar */}
                        <div
                            className="
                                w-7
                                h-7
                                rounded-full
                                bg-[#d8d3c4]
                                flex
                                items-center
                                justify-center
                                text-[12px]
                                font-helvetica
                                text-[#596579]
                                flex-shrink-0
                            "
                        >
                            {user?.firstName?.[0]?.toUpperCase()}
                        </div>

                        {/* Username */}
                        <span
                            className="
                                text-[14px]
                                font-helvetica
                                text-[#596579]
                                truncate
                            "
                        >
                            {user?.username}
                        </span>

                        {/* Dropdown */}
                        <button
                            onClick={() =>
                                setAccountOpen(prev => !prev)
                            }
                            className="ml-auto flex-shrink-0"
                        >
                            <ChevronDown
                                size={15}
                                strokeWidth={2}
                                className="
                                    text-[#596579]
                                    cursor-pointer
                                    hover:bg-white/50
                                    transition-colors
                                "
                            />
                        </button>

                    </div>

                </div>

            </motion.aside>

            {/* Child route */}
            <main className="flex-1 min-w-0 min-h-0 h-screen overflow-hidden">
                <Outlet />
            </main>

        </div>
    );
};