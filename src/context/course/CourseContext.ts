import {createContext, type Dispatch, type SetStateAction, useContext} from "react";
import type { Course } from "../../models/course.ts";

export type CourseProviderContextType = { course: Course | null; setCourse: Dispatch<SetStateAction<Course | null>>; };

export const currentCourseContext =
    createContext<CourseProviderContextType | null>(null);

export function useCurrentCourse() {
    const context = useContext(currentCourseContext);

    if (!context) {
        throw new Error("useCurrentCourse must be used within CurrentCourseProvider");
    }

    return context;
}
