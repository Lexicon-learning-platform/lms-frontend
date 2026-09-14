import {useEffect, useState} from "react";
import apiCall from "../functions/apiCall.ts";
import type {Course} from "../models/course.ts";

export default function PublicHome() {
    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
        async function loadCourses() {
            try {
                const response = await apiCall<Course[]>(
                    "/courses?page=1&pageSize=20"
                );

                setCourses(response ?? []);
            } catch (error) {
                console.error("Failed to load courses", error);
            }
        }

        loadCourses();
    }, []);

    return (
        <main className="flex-1 bg-slate-50">
            <div className="mx-auto w-full">
                {/* HERO */}
                <section className="relative overflow-hidden rounded-xl border border-slate-200 bg-white px-6 py-6 2xl:px-10 2xl:py-10">
                    <div
                        aria-hidden="true"
                        className="absolute -right-24 -top-32 h-[300px] w-[300px] rounded-full bg-red-50 blur-3xl 2xl:h-[420px] 2xl:w-[420px]"
                    />

                    <div className="relative grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-12 2xl:gap-20">
                        <div>
                            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700 2xl:mb-3 2xl:px-3.5 2xl:py-1.5 2xl:text-sm">
                                <span className="h-1.5 w-1.5 rounded-full bg-red-600 2xl:h-2 2xl:w-2" />
                                Utbildningar inom IT
                            </div>

                            <h1 className="text-3xl font-bold tracking-tight text-slate-950 2xl:text-4xl">
                                Bygg din framtid
                                <span className="text-red-600"> inom IT.</span>
                            </h1>
                        </div>

                        <p className="max-w-xl text-base leading-6 text-slate-600 2xl:max-w-2xl 2xl:text-lg 2xl:leading-8">
                            Praktiska utbildningar inom modern systemutveckling,
                            webbutveckling, cloud och DevOps.
                        </p>
                    </div>
                </section>

                {/* COURSES */}
                <section id="courses" className="pt-6 2xl:pt-10">
                    <div className="mb-4 flex items-end justify-between 2xl:mb-6">
                        <div>
                            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-red-600">
                                Våra utbildningar
                            </p>

                            <h2 className="text-2xl font-bold tracking-tight text-slate-950 2xl:text-3xl">
                                Hitta utbildningen för dig
                            </h2>
                        </div>

                        <p className="text-sm text-slate-500">
                            {courses.length}{" "}
                            {courses.length === 1
                                ? "utbildning"
                                : "utbildningar"}
                        </p>
                    </div>

                    {/* CARDS */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:gap-6">
                        {courses.map((course, index) => (
                            <article
                                key={course.id}
                                className="relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:border-slate-300 hover:shadow-md"
                            >
                                <div
                                    className={`h-1 ${
                                        index % 3 === 0
                                            ? "bg-red-600"
                                            : index % 3 === 1
                                                ? "bg-slate-900"
                                                : "bg-red-400"
                                    }`}
                                />

                                <div className="flex flex-1 flex-col p-5">
                                    <div className="mb-3">
                                    <span className="rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                                        IT-utbildning
                                    </span>
                                    </div>

                                    <h3 className="text-lg font-bold leading-snug text-slate-950">
                                        {course.name}
                                    </h3>

                                    <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-600">
                                        {course.description}
                                    </p>

                                    <div className="mt-4 grid grid-cols-2 gap-3">
                                        <div className="rounded-lg bg-slate-50 px-3 py-2">
                                            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                                                Start
                                            </p>

                                            <p className="mt-1 text-sm font-semibold text-slate-800">
                                                {new Date(
                                                    course.startDate
                                                ).toLocaleDateString("sv-SE")}
                                            </p>
                                        </div>

                                        <div className="rounded-lg bg-slate-50 px-3 py-2">
                                            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                                                Längd
                                            </p>

                                            <p className="mt-1 text-sm font-semibold text-slate-800">
                                                {course.duration} veckor
                                            </p>
                                        </div>
                                    </div>

                                    {course.modules.length > 0 && (
                                        <div className="mt-4">
                                            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                                                Du får lära dig
                                            </p>

                                            <ul className="flex flex-wrap gap-1.5">
                                                {course.modules
                                                    .slice(0, 3)
                                                    .map(module => (
                                                        <li
                                                            key={module.id}
                                                            className="rounded-full border border-slate-200 px-2.5 py-1 text-xs text-slate-700"
                                                        >
                                                            {module.name}
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
