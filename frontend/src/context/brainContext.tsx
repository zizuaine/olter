import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

type BrainContextType = {
    selectedBrain: string | null;
    setSelectedBrain: (brainId: string | null) => void;
    brains: Brain[];
    allBrains: Brain[];
};

type Brain = {
    _id: string | null;
    name: string;
    ownerId?: string;
};


const BrainContext = createContext<BrainContextType | null>(null);

export const BrainContextProvider = ({ children }: { children: ReactNode }) => {
    const [brains, setBrains] = useState<Brain[]>([])
    const [selectedBrain, setSelectedBrain] = useState<string | null>("personal");

    useEffect(() => {
        const fetchBrains = async () => {
            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:3000/api/v1/brain",
                {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            setBrains(data.brains);
        };

        fetchBrains();
    }, []);

    const allBrains = [{ _id: "personal", name: "Personal Brain" }, ...brains]

    return (
        <BrainContext.Provider
            value={{ selectedBrain, setSelectedBrain, brains, allBrains }}
        >
            {children}
        </BrainContext.Provider>
    );
};

export const useBrain = () => {
    const context = useContext(BrainContext);

    if (!context) {
        throw new Error("useBrain must be used inside BrainContextProvider");
    }

    return context;
};