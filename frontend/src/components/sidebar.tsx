import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Folder, MessageCircle, Users, ChevronDown, LogOut } from "lucide-react";
import { useAuth } from "../context/authContext";
import { Outlet } from "react-router-dom";

export const Sidebar = () => {
    const { user, logout } = useAuth();
    const [accountOpen, setAccountOpen] = useState(false);

    const navItems = [
        { to: "/files", label: "Files", icon: Folder },
        { to: "/conversations", label: "Conversations", icon: MessageCircle },
        { to: "/connections", label: "Connections", icon: Users },
    ];

    return (
        <aside className="
                w-[254px] h-screen flex-shrink-0
                bg-[#eeece7]
                border-r border-[#5A5A5A]/15
                flex flex-col justify-between
                px-5 py-8
            ">
            <div>
                <div className="mb-10 flex flex-col items-center">
                    <span className="font-nour text-[28px] text-[#0033CC]">olter</span>
                    {/* torii gate logo image goes here — drop your existing asset in, same as toriiGate in Auth.tsx */}
                </div>

                <nav className="flex flex-col gap-1">
                    {navItems.map(({ to, label, icon: Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `
                                    flex items-center gap-2.5
                                    px-3 py-2.5
                                    rounded-xl
                                    text-[14px]
                                    font-helvetica
                                    transition-colors
                                    ${isActive
                                    ? "bg-white text-[#0033CC] font-medium"
                                    : "text-[#596579] hover:bg-white/50"
                                }
                                `
                            }
                        >
                            <Icon size={17} strokeWidth={2} />
                            {label}
                        </NavLink>
                    ))}
                </nav>
            </div>

            <div className="relative">
                {accountOpen && (
                    <div className="
                            absolute bottom-full left-0 mb-2 w-full
                            bg-white
                            border border-[#5A5A5A]/15
                            rounded-xl
                            shadow-[0px_4px_16px_rgba(0,0,0,0.08)]
                            overflow-hidden
                        ">
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

                <button
                    onClick={() => setAccountOpen(!accountOpen)}
                    className="
                            w-full
                            flex items-center justify-between
                            px-2 py-2
                            rounded-xl
                            hover:bg-white/50
                            transition-colors
                        "
                >
                    <div className="flex items-center gap-2">
                        <div className="
                                w-7 h-7
                                rounded-full
                                bg-[#d8d3c4]
                                flex items-center justify-center
                                text-[12px]
                                font-helvetica
                                text-[#221D14]
                            ">
                            {user?.firstName?.[0]?.toUpperCase()}
                        </div>
                        <span className="text-[14px] font-helvetica text-[#221D14]">
                            {user?.username}
                        </span>
                    </div>
                    <ChevronDown size={15} strokeWidth={2} className="text-[#596579]" />
                </button>
            </div>
        </aside>
    )
}