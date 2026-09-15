import { useEffect, useState } from "react";
import Button from "./Button.tsx";
import ErrorMessage from "./Error.tsx";
import { useAuth } from "../context/auth/AuthContext.ts";
import { authApiCall } from "../functions/authApiCall.ts";
import type { Module } from "../models/module.ts";
import { activityTypes, type ActivityType } from "../models/activity.ts";

interface ActivityListItem {
    id: string;
    name: string;
    description: string;
    startOffset: number;
    duration: number;
    type: ActivityType;
}

export default function ActivityControl() {
    const { accessToken, setAccessToken } = useAuth();

    const [modules, setModules] = useState<Module[]>([]);
    const [selectedModuleId, setSelectedModuleId] = useState("");

    const [activityUpdateTrigger, setActivityUpdateTrigger] = useState(0);
    const [activities, setActivities] = useState<ActivityListItem[]>([]);
    const [selectedActivityId, setSelectedActivityId] = useState("");

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [startOffset, setStartOffset] = useState(0);
    const [duration, setDuration] = useState(60);
    const [type, setType] = useState<ActivityType>(activityTypes[0]);

    const [error, setError] = useState("");

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
    }, [accessToken, setAccessToken]);

    useEffect(() => {
        let isMounted = true;

        async function fetchActivities() {
            if (!selectedModuleId) {
                setActivities([]);
                return;
            }

            try {
                const data = await authApiCall<ActivityListItem[]>(
                    `/modules/${selectedModuleId}/activities?pageSize=100`,
                    accessToken,
                    setAccessToken,
                    { method: "GET" }
                );

                if (isMounted) setActivities(data ?? []);
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err.message : "Kunde inte hämta aktiviteter");
                }
            }
        }

        fetchActivities();

        return () => {
            isMounted = false;
        };
    }, [selectedModuleId, activityUpdateTrigger, accessToken, setAccessToken]);

    function resetForm() {
        setName("");
        setDescription("");
        setStartOffset(0);
        setDuration(60);
        setType(activityTypes[0]);
    }

    function selectModule(moduleId: string) {
        setSelectedModuleId(moduleId);
        setSelectedActivityId("");
        resetForm();
    }

    function selectActivity(activityId: string) {
        setSelectedActivityId(activityId);

        if (!activityId) {
            resetForm();
            return;
        }

        const activity = activities.find(a => a.id === activityId);
        setName(activity?.name ?? "");
        setDescription(activity?.description ?? "");
        setStartOffset(activity?.startOffset ?? 0);
        setDuration(activity?.duration ?? 60);
        setType(activity?.type ?? activityTypes[0]);
    }

    function startNewActivity() {
        selectActivity("");
    }

    async function saveActivity() {
        if (!selectedModuleId) return;

        setError("");

        const payload = { name, description, startOffset, duration, type };

        try {
            if (selectedActivityId) {
                await authApiCall(
                    `/modules/${selectedModuleId}/activities/${selectedActivityId}`,
                    accessToken,
                    setAccessToken,
                    { method: "PUT", body: JSON.stringify(payload) }
                );
            } else {
                await authApiCall(
                    `/modules/${selectedModuleId}/activities`,
                    accessToken,
                    setAccessToken,
                    { method: "POST", body: JSON.stringify(payload) }
                );
            }

            setActivityUpdateTrigger(Date.now());
        } catch (err) {
            setError(err instanceof Error ? err.message : "Kunde inte spara aktiviteten");
        }
    }

    return (
        <div className="flex flex-col md:flex-row gap-6">
            <aside className="w-full md:w-1/3">
                <div className="bg-slate-200 rounded-xl border border-slate-900 flex flex-col gap-3 p-6">
                    <label className="flex flex-col gap-1 text-sm" htmlFor="activityModuleSelect">
                        Modul
                        <select
                            id="activityModuleSelect"
                            className="bg-slate-100 border border-slate-700 rounded-lg p-2"
                            value={selectedModuleId}
                            onChange={e => selectModule(e.target.value)}
                        >
                            <option value="">Välj modul...</option>
                            {modules.map(m => (
                                <option key={m.id} value={m.id}>{m.name}</option>
                            ))}
                        </select>
                    </label>

                    {selectedModuleId && (
                        <>
                            <label className="flex flex-col gap-1 text-sm" htmlFor="activitySelect">
                                Aktivitet
                                <select
                                    id="activitySelect"
                                    className="bg-slate-100 border border-slate-700 rounded-lg p-2"
                                    value={selectedActivityId}
                                    onChange={e => selectActivity(e.target.value)}
                                >
                                    <option value="">Ny aktivitet...</option>
                                    {activities.map(a => (
                                        <option key={a.id} value={a.id}>{a.name}</option>
                                    ))}
                                </select>
                            </label>

                            <Button label="Ny aktivitet" onClick={startNewActivity} />
                        </>
                    )}
                </div>
            </aside>

            <main className="w-full md:w-2/3">
                {selectedModuleId ? (
                    <div className="bg-slate-200 rounded-xl border border-slate-900 flex flex-col gap-4 p-6">
                        <h2 className="text-lg font-semibold">
                            {selectedActivityId ? "Redigera aktivitet" : "Skapa ny aktivitet"}
                        </h2>

                        <label className="flex flex-col gap-1 text-sm" htmlFor="activityName">
                            Namn
                            <input
                                id="activityName"
                                className="bg-slate-100 border border-slate-700 rounded-lg p-2 focus:outline-none focus:border-emerald-500"
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </label>

                        <label className="flex flex-col gap-1 text-sm" htmlFor="activityDescription">
                            Beskrivning
                            <textarea
                                id="activityDescription"
                                className="bg-slate-100 border border-slate-700 rounded-lg p-2 focus:outline-none focus:border-emerald-500"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </label>

                        <label className="flex flex-col gap-1 text-sm" htmlFor="activityType">
                            Typ
                            <select
                                id="activityType"
                                className="bg-slate-100 border border-slate-700 rounded-lg p-2"
                                value={type}
                                onChange={e => setType(e.target.value as ActivityType)}
                            >
                                {activityTypes.map(t => (
                                    <option key={t} value={t}>{t}</option>
                                ))}
                            </select>
                        </label>

                        <label className="flex flex-col gap-1 text-sm" htmlFor="activityStartOffset">
                            Start (minuter in i modulen)
                            <input
                                id="activityStartOffset"
                                className="bg-slate-100 border border-slate-700 rounded-lg p-2 focus:outline-none focus:border-emerald-500"
                                type="number"
                                min={0}
                                value={startOffset}
                                onChange={e => setStartOffset(Number(e.target.value))}
                            />
                        </label>

                        <label className="flex flex-col gap-1 text-sm" htmlFor="activityDuration">
                            Längd (minuter)
                            <input
                                id="activityDuration"
                                className="bg-slate-100 border border-slate-700 rounded-lg p-2 focus:outline-none focus:border-emerald-500"
                                type="number"
                                min={1}
                                value={duration}
                                onChange={e => setDuration(Number(e.target.value))}
                            />
                        </label>

                        <div className="flex gap-2 justify-end">
                            <Button label="Spara" onClick={saveActivity} />
                        </div>

                        <ErrorMessage error={error} />
                    </div>
                ) : (
                    <div className="bg-slate-200 rounded-xl border border-slate-900 flex flex-col gap-4 p-6">
                        <p className="text-slate-600">Välj en modul till vänster för att hantera dess aktiviteter.</p>
                        <ErrorMessage error={error} />
                    </div>
                )}
            </main>
        </div>
    );
}
