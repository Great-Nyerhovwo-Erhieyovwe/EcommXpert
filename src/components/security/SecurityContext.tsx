import { createContext, useContext, type ReactNode } from 'react';

const SecurityContext = createContext<any>(null);

export const useSecurity = () => useContext(SecurityContext);

export const SecurityProvider = ({ children }: { children: ReactNode }) => {
    return (
        <SecurityContext.Provider value={{}}>
            {children}
        </SecurityContext.Provider>
    );
};
