import { createContext, useContext, type ReactNode } from 'react';

const EmailContext = createContext<any>(null);

export const useEmail = () => useContext(EmailContext);

export const EmailProvider = ({ children }: { children: ReactNode }) => {
    return (
        <EmailContext.Provider value={{}}>
            {children}
        </EmailContext.Provider>
    );
};
