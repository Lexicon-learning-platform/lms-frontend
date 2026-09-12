import { createContext, useContext } from "react";

export interface AuthContextType {
    accessToken: string | null;
    setAccessToken: (token: string | null) => void;
    isCheckingAuth: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
}
