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
                    setAccessToken,
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
        <div>
            <div>
                <h2 className="text-2xl font-bold mb-4">{module.name}</h2>
                <p className="mb-2">{module.description}</p>
                <div>
                    Längd: {module.duration} dag
                    {module.duration > 1 ? "ar" : ""}
                </div>
            </div>
            <hr className="my-8" />
            <div>
                <h3 className="text-xl font-semibold mb-4">Aktiviteter</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {module.activities.length > 0 ? (
                        module.activities
                            .sort((a, b) => a.startOffset - b.startOffset)
                            .map((a) => (
                                <div
                                    key={a.id}
                                    className="min-w-40 max-w-60 border border-black rounded-lg p-1.5"
                                >
                                    <h4 className="font-semibold">{a.name}</h4>
                                    <p>Typ: {a.type}</p>
                                    <p className="">
                                        Längd: {a.duration} minuter
                                    </p>
                                </div>
                            ))
                    ) : (
                        <span>Inga aktiviteter registrerade</span>
                    )}
                </div>
            </div>
            <hr className="my-8" />
            <div>
                <h3 className="text-xl font-semibold mb-4">Resurser</h3>
                <div className="">
                    {module.resources.length > 0 ? (
                        module.resources.map((r) => (
                            <div
                                key={r.id}
                                className="border border-black rounded-lg p-1.5 mb-3"
                            >
                                <h4 className="font-semibold">{r.name}</h4>
                                <p>{r.description}</p>
                                <p>Typ: {r.type}</p>
                            </div>
                        ))
                    ) : (
                        <span>Inga resurser registrerade</span>
                    )}
                </div>
            </div>
        </div>
    );
}
