import type { Course } from "./course.ts";

export interface UserStats {
    id: string;
    userName: string;
    givenName: string | null;
    lastName: string | null;
    courses: Course[] | null;
}