import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { useAuth } from "./authContext";
import { API_URL } from "../config/api";

export type Brain = {
    _id: string;
    name: string;
    ownerId?: string;
};

type BrainContextType = {
    selectedBrain: string | null;
    setSelectedBrain: (brainId: string | null) => void;
    brains: Brain[];
    allBrains: Brain[];
    addBrain: (brain: Brain) => void;
    removeBrain: (id: string) => void
};

const BrainContext = createContext<BrainContextType | null>(null);

export const BrainContextProvider = ({
    children
}: {
    children: ReactNode;
}) => {
    const [brains, setBrains] = useState<Brain[]>([]);
    const [selectedBrain, setSelectedBrain] = useState<string | null>("personal");

    const { user, isLoading } = useAuth();

    useEffect(() => {
        const fetchBrains = async () => {
            if (isLoading || !user) return;

            const token = localStorage.getItem("token");

            const response = await fetch(
                `${API_URL}/api/v1/brain`,
                {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                console.error("Failed to fetch brains");
                return;
            }

            const data = await response.json();

            setBrains(data.brains);
        };

        fetchBrains();
    }, [user, isLoading]);

    const addBrain = (brain: Brain) => {
        setBrains(prev => [...prev, brain]);
    };

    const removeBrain = (id: string) => {
        setBrains(prevBrains =>
            prevBrains.filter(brain => brain._id !== id)
        );
    };

    const allBrains = [
        { _id: "personal", name: "Personal Brain" },
        ...brains
    ];

    return (
        <BrainContext.Provider
            value={{
                selectedBrain,
                setSelectedBrain,
                brains,
                allBrains,
                addBrain,
                removeBrain
            }}
        >
            {children}
        </BrainContext.Provider>
    );
};

export const useBrain = () => {
    const context = useContext(BrainContext);

    if (!context) {
        throw new Error(
            "useBrain must be used inside BrainContextProvider"
        );
    }

    return context;
};