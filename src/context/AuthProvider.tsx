import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext.tsx";
import * as React from "react";

interface Props {
    children: React.ReactNode;
}

export default function AuthProvider({ children }: Props) {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [
        isCheckingAuth,
       // setIsCheckingAuth
    ] = useState(true);

    useEffect(() => {
        //todo
        // refreshAccessToken()
        //     .then(setAccessToken)
        //     .catch(console.error)
        //     .finally(() => setIsCheckingAuth(false));
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
