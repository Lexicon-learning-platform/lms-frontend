import { useState, type ReactNode } from "react";
import { currentCourseContext } from "./CourseContext.ts";
import type { Course } from "../../models/course.ts";

export default function CurrentCourseProvider({ children }: { children: ReactNode }) {
    const [course, setCourse] = useState<Course | null>(null);

    return (
        <currentCourseContext.Provider value={{ course, setCourse }}>
            {children}
        </currentCourseContext.Provider>
    );
}
