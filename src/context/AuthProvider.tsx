import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext.tsx";
import * as React from "react";
import apiCall from "../functions/apiCall.ts";
import type {AuthResponse} from "../models/AuthResponse.ts";

interface Props {
    children: React.ReactNode;
}

export default function AuthProvider({ children }: Props) {

    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    const refreshAccessToken = async () => {
        const response = await apiCall<AuthResponse>("/auth/refresh-token", {
            method: "POST"
        });

        return response?.accessToken ?? null;
    };

    useEffect(() => {
        refreshAccessToken()
            .then(setAccessToken)
            .catch(console.error)
            .finally(() => setIsCheckingAuth(false));
    }, []);

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                setAccessToken,
                isCheckingAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
