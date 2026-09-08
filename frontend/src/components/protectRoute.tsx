import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export const ProtectRoute = () => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading…</div>; // swap for a real spinner/skeleton whenever you build one
    }
    if (!isAuthenticated) {
        return <Navigate to="/auth" replace />
    }
    return (
        <Outlet />
    )
} 