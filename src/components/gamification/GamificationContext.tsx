import { createContext, useContext, type ReactNode } from 'react';

const GamificationContext = createContext<any>(null);

export const useGamification = () => useContext(GamificationContext);

export const GamificationProvider = ({ children }: { children: ReactNode }) => {
    return (
        <GamificationContext.Provider value={{}}>
            {children}
        </GamificationContext.Provider>
    );
};
