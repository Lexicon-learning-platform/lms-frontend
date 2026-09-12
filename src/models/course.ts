import type { Module } from "./module.ts";

export interface Course {
    id: string;
    name: string | null;
    description: string | null;
    startDate: string;
    duration: number;
    modules: Module[];
}
