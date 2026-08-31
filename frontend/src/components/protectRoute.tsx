import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export const ProtectRoute = () => {
    const { isAuthenticated } = useAuth()

    if (!isAuthenticated) {
        return <Navigate to="/auth" replace />
    }
    return (
        <Outlet />
    )
} 