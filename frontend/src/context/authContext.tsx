import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

type userProfile = {
    username: string,
    email: string,
    firstName: string,
    LastName: string,
}

type AuthContextType = {
    isAuthenticated: boolean,
    user: userProfile | null,
    login: (token: string) => void,
    logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

const fetchUser = async (token: string): Promise<userProfile | null> => {
    try {
        const res = await fetch("http://localhost:3000/api/v1/user/me", {
            method: "Get",
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        if (!res.ok) return null;
        return await res.json();
    } catch (error) {
        return null;
    }
}

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<userProfile | null>(null);

    const login = async (token: string) => {
        localStorage.setItem("token", token);
        const profile = await fetchUser(token);
        setUser(profile)
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;
        fetchUser(token).then((profile) => setUser(profile));
    }, [])

    useEffect(() => {
        if (!user) return;
        const token = localStorage.getItem("token");
        if (!token) return;
        const { exp } = jwtDecode<{ exp: number }>(token);
        const msUntilExpiry = exp * 1000 - Date.now();
        const timer = setTimeout(logout, msUntilExpiry);
        return () => clearTimeout(timer);
    }, [user]);

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("component is not wrapped inside AuthContextProvider");
    return context;
}