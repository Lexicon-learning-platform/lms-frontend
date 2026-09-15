import { AuthContext } from "./AuthContext.ts";
import * as React from "react";
import {useState} from "react";


interface Props {
    children: React.ReactNode;
}

export default function AuthProvider({ children }: Props) {
    const [accessToken, setAccessToken] = useState<string | null>(null);

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                setAccessToken
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
