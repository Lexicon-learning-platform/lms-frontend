import { useEffect, useState } from "react";
import Button from "./Button.tsx";
import ErrorMessage from "./Error.tsx";
import { useAuth } from "../context/auth/AuthContext.ts";
import { authApiCall } from "../functions/authApiCall.ts";
import type { Course } from "../models/course.ts";
import type { CourseSummary } from "../models/courseSummary.ts";

export default function CourseControl() {
    const { accessToken, setAccessToken } = useAuth();

    const [updateTrigger, setUpdateTrigger] = useState(0);
    const [courses, setCourses] = useState<CourseSummary[]>([]);
    const [selectedCourseId, setSelectedCourseId] = useState("");

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [duration, setDuration] = useState(1);
    const [moduleIds, setModuleIds] = useState<string[]>([]);
    const [attachedModuleNames, setAttachedModuleNames] = useState<string[]>([]);

    const [error, setError] = useState("");

    function resetForm() {
        setName("");
        setDescription("");
        setStartDate("");
        setDuration(1);
        setModuleIds([]);
        setAttachedModuleNames([]);
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
                setAttachedModuleNames(data.modules.map(m => m.name ?? "(namnlös modul)"));
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

                    {selectedCourseId && (
                        <p className="text-sm text-slate-600">
                            <span className="font-semibold">Moduler i kursen: </span>
                            {attachedModuleNames.length > 0
                                ? attachedModuleNames.join(", ")
                                : "Inga moduler ännu"}
                        </p>
                    )}

                    <div className="flex gap-2 justify-end">
                        <Button label="Spara" onClick={saveCourse} />
                    </div>

                    <ErrorMessage error={error} />
                </div>
            </main>
        </div>
    );
}
