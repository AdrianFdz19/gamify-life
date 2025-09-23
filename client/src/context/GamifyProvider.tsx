import React, { createContext, useContext, type ReactNode } from 'react'
import { useAppContext } from './AppProvider';

interface GamifyContextType {
    xp: number;
    level: number;
};

type Area = {
    id: string;
    name: string;
    xp: number;
    level: number;
};

type GamifyState = {
    totalXp: number;
    level: number;
    areas: Area[];
};

// Creamos el contexto con un valor inicial vacío
const GamifyContext = createContext<GamifyContextType | undefined>(undefined);

// Hook personalizado para usar el contexto
export const useGamify = () => {
    const context = useContext(GamifyContext);
    if (!context) {
        throw new Error("useGamify debe usarse dentro de un GamifyProvider");
    }
    return context;
};

interface GamifyContextProps {
    children: ReactNode;
}

export default function GamifyProvider({ children }: GamifyContextProps) {

    const { user } = useAppContext();

    const data = {
        xp: user?.xp ?? 0,
        level: user?.level ?? 1
    }

    return (
        <GamifyContext.Provider value={data} >{children}</GamifyContext.Provider>
    )
}
