import { useEffect, useState } from "react";
import Button from "./Button.tsx";
import ErrorMessage from "./Error.tsx";
import { useAuth } from "../context/auth/AuthContext.ts";
import { authApiCall } from "../functions/authApiCall.ts";
import type { Module } from "../models/module.ts";
import ResourceManager from "./ResourceManager.tsx";

interface ModuleControlProps {
    onSaved?: () => void;
}

export default function ModuleControl({ onSaved }: ModuleControlProps) {
    const { accessToken, setAccessToken } = useAuth();

    const [updateTrigger, setUpdateTrigger] = useState(0);
    const [modules, setModules] = useState<Module[]>([]);
    const [selectedModuleId, setSelectedModuleId] = useState("");

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState(1);

    const [error, setError] = useState("");

    function resetForm() {
        setName("");
        setDescription("");
        setDuration(1);
    }

    useEffect(() => {
        let isMounted = true;

        async function fetchModules() {
            try {
                const data = await authApiCall<Module[]>(
                    "/modules?pageSize=100",
                    accessToken,
                    setAccessToken,
                    { method: "GET" }
                );

                if (isMounted) setModules(data ?? []);
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err.message : "Kunde inte hämta moduler");
                }
            }
        }

        fetchModules();

        return () => {
            isMounted = false;
        };
    }, [updateTrigger, accessToken, setAccessToken]);

    function selectModule(moduleId: string) {
        setSelectedModuleId(moduleId);

        if (!moduleId) {
            resetForm();
            return;
        }

        const module = modules.find(m => m.id === moduleId);
        setName(module?.name ?? "");
        setDescription(module?.description ?? "");
        setDuration(module?.duration ?? 1);
    }

    function startNewModule() {
        selectModule("");
    }

    async function saveModule() {
        setError("");

        const payload = { name, description, duration };

        try {
            if (selectedModuleId) {
                await authApiCall(
                    `/modules/${selectedModuleId}`,
                    accessToken,
                    setAccessToken,
                    { method: "PUT", body: JSON.stringify(payload) }
                );
            } else {
                await authApiCall(
                    "/modules",
                    accessToken,
                    setAccessToken,
                    { method: "POST", body: JSON.stringify(payload) }
                );
            }

            setUpdateTrigger(Date.now());
            onSaved?.();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Kunde inte spara modulen");
        }
    }

    async function deleteModule() {
        if (!selectedModuleId) return;
        if (!window.confirm(`Radera modulen "${name}"? Det går inte att ångra.`)) return;

        setError("");

        try {
            await authApiCall(
                `/modules/${selectedModuleId}`,
                accessToken,
                setAccessToken,
                { method: "DELETE" }
            );

            startNewModule();
            setUpdateTrigger(Date.now());
            onSaved?.();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Kunde inte radera modulen");
        }
    }

    return (
        <div className="flex flex-col md:flex-row gap-6">
            <aside className="w-full md:w-1/3">
                <div className="bg-slate-200 rounded-xl border border-slate-900 flex flex-col gap-3 p-6">
                    <label className="flex flex-col gap-1 text-sm" htmlFor="moduleSelect">
                        Välj modul att redigera
                        <select
                            id="moduleSelect"
                            className="bg-slate-100 border border-slate-700 rounded-lg p-2"
                            value={selectedModuleId}
                            onChange={e => selectModule(e.target.value)}
                        >
                            <option value="">Ny modul...</option>
                            {modules.map(m => (
                                <option key={m.id} value={m.id}>{m.name}</option>
                            ))}
                        </select>
                    </label>

                    <Button label="Ny modul" onClick={startNewModule} />
                </div>
            </aside>

            <main className="w-full md:w-2/3">
                <div className="bg-slate-200 rounded-xl border border-slate-900 flex flex-col gap-4 p-6">
                    <h2 className="text-lg font-semibold">
                        {selectedModuleId ? "Redigera modul" : "Skapa ny modul"}
                    </h2>

                    <label className="flex flex-col gap-1 text-sm">
                        Namn
                        <input
                            className="bg-slate-100 border border-slate-700 rounded-lg p-2 focus:outline-none focus:border-emerald-500"
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </label>

                    <label className="flex flex-col gap-1 text-sm">
                        Beskrivning
                        <textarea
                            className="bg-slate-100 border border-slate-700 rounded-lg p-2 focus:outline-none focus:border-emerald-500"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </label>

                    <label className="flex flex-col gap-1 text-sm">
                        Längd (dagar)
                        <input
                            className="bg-slate-100 border border-slate-700 rounded-lg p-2 focus:outline-none focus:border-emerald-500"
                            type="number"
                            min={1}
                            value={duration}
                            onChange={e => setDuration(Number(e.target.value))}
                        />
                    </label>

                    <div className="flex gap-2 justify-end items-center">
                        {selectedModuleId && (
                            <button
                                type="button"
                                className="text-red-600 text-sm mr-auto hover:underline"
                                onClick={deleteModule}
                            >
                                Radera modul
                            </button>
                        )}
                        <Button label="Spara" onClick={saveModule} />
                    </div>

                    <ErrorMessage error={error} />

                    {selectedModuleId && (
                        <div className="flex flex-col gap-1 border-t border-slate-300 pt-4">
                            <span className="font-semibold text-sm">Resurser</span>
                            <ResourceManager
                                key={selectedModuleId}
                                resourcesEndpoint={`/modules/${selectedModuleId}/resources`}
                            />
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
