import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import { API_URL } from "../config/api";

type userProfile = {
    _id: string,
    username: string,
    email: string,
    firstName: string,
    LastName: string,
}

type AuthContextType = {
    isAuthenticated: boolean,
    isLoading: boolean,
    user: userProfile | null,
    login: (token: string) => void,
    logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

const fetchUser = async (token: string): Promise<userProfile | null> => {
    try {
        const res = await fetch(`${API_URL}/api/v1/user/me`, {
            method: "Get",
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        if (!res.ok) return null;
        const data = await res.json()
        return data.user;
    } catch (error) {
        return null;
    }
}

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<userProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

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
        if (!token) {
            setIsLoading(false);
            return;
        }
        fetchUser(token).then((profile) => setUser(profile)).finally(() => setIsLoading(false));
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
        <AuthContext.Provider value={{ isAuthenticated: !!user, isLoading, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("component is not wrapped inside AuthContextProvider");
    return context;
}