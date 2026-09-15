import { useEffect, useState } from "react";
import Button from "./Button.tsx";
import ErrorMessage from "./Error.tsx";
import { useAuth } from "../context/auth/AuthContext.ts";
import { authApiCall } from "../functions/authApiCall.ts";
import type { Course } from "../models/course.ts";
import type { CourseSummary } from "../models/courseSummary.ts";
import type { Module } from "../models/module.ts";

interface CourseControlProps {
    // Bumped by ModuleControl whenever a module is created/edited, so the
    // attach-checklist below picks up new/renamed modules without a reload.
    moduleRefreshSignal?: number;
}

export default function CourseControl({ moduleRefreshSignal = 0 }: CourseControlProps) {
    const { accessToken, setAccessToken } = useAuth();

    const [updateTrigger, setUpdateTrigger] = useState(0);
    const [courses, setCourses] = useState<CourseSummary[]>([]);
    const [selectedCourseId, setSelectedCourseId] = useState("");

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [duration, setDuration] = useState(1);
    const [moduleIds, setModuleIds] = useState<string[]>([]);
    const [allModules, setAllModules] = useState<Module[]>([]);

    const [error, setError] = useState("");

    function resetForm() {
        setName("");
        setDescription("");
        setStartDate("");
        setDuration(1);
        setModuleIds([]);
    }

    useEffect(() => {
        let isMounted = true;

        async function fetchCourses() {
            try {
                const data = await authApiCall<CourseSummary[]>(
                    "/courses",
                    accessToken,
                    setAccessToken,
                    { method: "GET" }
                );

                if (isMounted) setCourses(data ?? []);
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err.message : "Kunde inte hämta kurser");
                }
            }
        }

        fetchCourses();

        return () => {
            isMounted = false;
        };
    }, [updateTrigger, accessToken, setAccessToken]);

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

                if (isMounted) setAllModules(data ?? []);
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
    }, [moduleRefreshSignal, accessToken, setAccessToken]);

    useEffect(() => {
        let isMounted = true;

        async function fetchCourse() {
            if (!selectedCourseId) {
                resetForm();
                return;
            }

            try {
                const data = await authApiCall<Course>(
                    `/courses/${selectedCourseId}`,
                    accessToken,
                    setAccessToken,
                    { method: "GET" }
                );

                if (!isMounted || !data) return;

                setName(data.name ?? "");
                setDescription(data.description ?? "");
                setStartDate(data.startDate);
                setDuration(data.duration);
                setModuleIds(data.modules.map(m => m.id));
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err.message : "Kunde inte hämta kursen");
                }
            }
        }

        fetchCourse();

        return () => {
            isMounted = false;
        };
    }, [selectedCourseId, accessToken, setAccessToken]);

    function toggleModule(moduleId: string) {
        setModuleIds(current =>
            current.includes(moduleId)
                ? current.filter(id => id !== moduleId)
                : [...current, moduleId]
        );
    }

    function moveModule(index: number, direction: -1 | 1) {
        setModuleIds(current => {
            const target = index + direction;
            if (target < 0 || target >= current.length) return current;

            const next = [...current];
            [next[index], next[target]] = [next[target], next[index]];
            return next;
        });
    }

    function startNewCourse() {
        setSelectedCourseId("");
        resetForm();
    }

    async function saveCourse() {
        setError("");

        const payload = {
            name,
            description,
            startDate,
            duration,
            moduleIds,
        };

        try {
            if (selectedCourseId) {
                await authApiCall(
                    `/courses/${selectedCourseId}`,
                    accessToken,
                    setAccessToken,
                    { method: "PUT", body: JSON.stringify(payload) }
                );
            } else {
                await authApiCall(
                    "/courses",
                    accessToken,
                    setAccessToken,
                    { method: "POST", body: JSON.stringify(payload) }
                );
            }

            setUpdateTrigger(Date.now());
        } catch (err) {
            setError(err instanceof Error ? err.message : "Kunde inte spara kursen");
        }
    }

    async function deleteCourse() {
        if (!selectedCourseId) return;
        if (!window.confirm(`Radera kursen "${name}"? Det går inte att ångra.`)) return;

        setError("");

        try {
            await authApiCall(
                `/courses/${selectedCourseId}`,
                accessToken,
                setAccessToken,
                { method: "DELETE" }
            );

            startNewCourse();
            setUpdateTrigger(Date.now());
        } catch (err) {
            setError(err instanceof Error ? err.message : "Kunde inte radera kursen");
        }
    }

    const attachedModules: { module: Module; offset: number }[] = [];
    let cursor = 0;
    for (const moduleId of moduleIds) {
        const module = allModules.find(m => m.id === moduleId);
        if (!module) continue;
        attachedModules.push({ module, offset: cursor });
        cursor += module.duration ?? 0;
    }

    const availableModules = allModules.filter(m => !moduleIds.includes(m.id));

    return (
        <div className="flex flex-col md:flex-row gap-6">
            <aside className="w-full md:w-1/3">
                <div className="bg-slate-200 rounded-xl border border-slate-900 flex flex-col gap-3 p-6">
                    <label className="flex flex-col gap-1 text-sm" htmlFor="courseSelect">
                        Välj kurs att redigera
                        <select
                            id="courseSelect"
                            className="bg-slate-100 border border-slate-700 rounded-lg p-2"
                            value={selectedCourseId}
                            onChange={e => setSelectedCourseId(e.target.value)}
                        >
                            <option value="">Ny kurs...</option>
                            {courses.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </label>

                    <Button label="Ny kurs" onClick={startNewCourse} />
                </div>
            </aside>

            <main className="w-full md:w-2/3">
                <div className="bg-slate-200 rounded-xl border border-slate-900 flex flex-col gap-4 p-6">
                    <h2 className="text-lg font-semibold">
                        {selectedCourseId ? "Redigera kurs" : "Skapa ny kurs"}
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
                        Startdatum
                        <input
                            className="bg-slate-100 border border-slate-700 rounded-lg p-2 focus:outline-none focus:border-emerald-500"
                            type="date"
                            value={startDate}
                            onChange={e => setStartDate(e.target.value)}
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

                    <div className="flex flex-col gap-1 text-sm">
                        <span className="font-semibold">Moduler i kursen (i ordning)</span>
                        <span className="text-xs text-slate-500">
                            Ordningen styr när varje modul startar - flytta en modul för att ändra dess startdag.
                        </span>

                        {attachedModules.length === 0 ? (
                            <span className="text-slate-500">Inga moduler tillagda ännu.</span>
                        ) : (
                            <ul className="flex flex-col gap-1">
                                {attachedModules.map(({ module, offset }, index) => (
                                    <li
                                        key={module.id}
                                        className="flex items-center gap-2 bg-slate-100 border border-slate-700 rounded-lg p-2"
                                    >
                                        <div className="flex flex-col">
                                            <button
                                                type="button"
                                                className="leading-none px-1 disabled:opacity-30"
                                                disabled={index === 0}
                                                onClick={() => moveModule(index, -1)}
                                                aria-label={`Flytta ${module.name} tidigare`}
                                            >
                                                ▲
                                            </button>
                                            <button
                                                type="button"
                                                className="leading-none px-1 disabled:opacity-30"
                                                disabled={index === attachedModules.length - 1}
                                                onClick={() => moveModule(index, 1)}
                                                aria-label={`Flytta ${module.name} senare`}
                                            >
                                                ▼
                                            </button>
                                        </div>

                                        <div className="flex-1">
                                            <div className="font-medium">{module.name}</div>
                                            <div className="text-xs text-slate-500">
                                                Startdag {offset} · Längd {module.duration} dag{module.duration !== 1 ? "ar" : ""}
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            className="text-red-600 text-xs"
                                            onClick={() => toggleModule(module.id)}
                                        >
                                            Ta bort
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}

                        <span className="font-semibold mt-3">Tillgängliga moduler</span>

                        {availableModules.length === 0 ? (
                            <span className="text-slate-500">
                                {allModules.length === 0
                                    ? "Inga moduler skapade ännu - skapa en nedan under \"Moduler\"."
                                    : "Alla moduler är redan tillagda i kursen."}
                            </span>
                        ) : (
                            <ul className="flex flex-col gap-1 max-h-36 overflow-y-auto bg-slate-100 border border-slate-700 rounded-lg p-2">
                                {availableModules.map(m => (
                                    <li key={m.id} className="flex items-center justify-between gap-2">
                                        {m.name}
                                        <button
                                            type="button"
                                            className="text-emerald-700 text-xs"
                                            onClick={() => toggleModule(m.id)}
                                        >
                                            Lägg till
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="flex gap-2 justify-end items-center">
                        {selectedCourseId && (
                            <button
                                type="button"
                                className="text-red-600 text-sm mr-auto hover:underline"
                                onClick={deleteCourse}
                            >
                                Radera kurs
                            </button>
                        )}
                        <Button label="Spara" onClick={saveCourse} />
                    </div>

                    <ErrorMessage error={error} />
                </div>
            </main>
        </div>
    );
}
