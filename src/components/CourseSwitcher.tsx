import { useState } from "react";
import { useAuth } from "../context/auth/AuthContext.ts";
import { useCurrentCourse } from "../context/course/CourseContext.ts";
import { authApiCall } from "../functions/authApiCall.ts";
import type { Course } from "../models/course.ts";
import type { CourseSummary } from "../models/courseSummary.ts";

export default function CourseSwitcher() {
    const [isOpen, setIsOpen] = useState(false);
    const [courses, setCourses] = useState<CourseSummary[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>("");

    const { accessToken, setAccessToken } = useAuth();
    const { course, setCourse } = useCurrentCourse();

    async function toggleMenu() {
        if (isOpen) {
            setIsOpen(false);
            return;
        }

        setIsOpen(true);
        setIsLoading(true);
        setError("");

        try {
            const response = await authApiCall<CourseSummary[]>(
                "/courses",
                accessToken,
                setAccessToken
            );

            setCourses(response ?? []);
        } catch {
            setError("Kunde inte hämta kurser");
        } finally {
            setIsLoading(false);
        }
    }

    async function selectCourse(courseId: string) {
        setError("");

        try {
            const response = await authApiCall<Course>(
                `/courses/${courseId}`,
                accessToken,
                setAccessToken
            );

            setCourse(response);
            setIsOpen(false);
        } catch {
            setError("Kunde inte hämta kursen");
        }
    }

    return (
        <div className="relative">
            <button
                type="button"
                onClick={toggleMenu}
                className="flex items-center gap-1"
            >
                {course?.name ?? "Kurs"}
                <span className="text-xs text-slate-400">{isOpen ? "▲" : "▼"}</span>
            </button>

            {isOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50 text-sm normal-case">
                    {isLoading && (
                        <p className="px-4 py-2 text-slate-400">Laddar...</p>
                    )}

                    {!isLoading && error && (
                        <p className="px-4 py-2 text-red-500">{error}</p>
                    )}

                    {!isLoading && !error && courses.length === 0 && (
                        <p className="px-4 py-2 text-slate-400">Inga kurser hittades</p>
                    )}

                    {!isLoading && courses.map(c => (
                        <button
                            key={c.id}
                            type="button"
                            onClick={() => selectCourse(c.id)}
                            className={`block w-full text-left px-4 py-2 hover:bg-slate-50 ${
                                c.id === course?.id
                                    ? "bg-slate-100 font-semibold text-slate-900"
                                    : "text-slate-700"
                            }`}
                        >
                            {c.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
