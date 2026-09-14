

import { useEffect, useState } from "react";
import { useAuth } from "../context/auth/AuthContext.ts";
import { authApiCall } from "../functions/authApiCall.ts";
import type { ModuleExtended } from "../models/moduleExtended.ts";

interface ModuleProps {
    moduleId: string;
}

export default function Module({ moduleId }: ModuleProps) {
    const { accessToken, setAccessToken } = useAuth();
    const [module, setModule] = useState<ModuleExtended | null>(null);

    useEffect(() => {
        async function loadModule() {
            try {
                const response = await authApiCall<ModuleExtended>(
                    `/modules/${moduleId}`,
                    accessToken,
                    setAccessToken
                );

                setModule(response);
            } catch (error) {
                console.error("Failed to load module", error);
            }
        }

        loadModule();
    }, [moduleId, accessToken, setAccessToken]);

    if (!module) {
        return <p>Loading module...</p>;
    }

    return (
        <pre className="whitespace-pre-wrap">
            {JSON.stringify(module, null, 4)}
        </pre>
    );
}
