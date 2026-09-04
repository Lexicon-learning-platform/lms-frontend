// mock/modules.ts

import type { Module } from "../models/module";

export const modules: Module[] = [
    {
        id: "1",
        name: "React",
        description: "Introduktion till React och komponentbaserad utveckling.",
        durationDays: 20,
        activities: [
            {
                id: "1",
                activityType: "Lecture",
                name: "React Router",
                description: "Genomgång av routing i React.",
                startTimeOffset: 2,
                durationMinutes: 120,
            },
            {
                id: "2",
                activityType: "Assignment",
                name: "React Components",
                description: "Bygg återanvändbara React-komponenter.",
                startTimeOffset: 5,
                durationMinutes: 180,
            },
        ],
    },
    {
        id: "2",
        name: "ASP.NET Core",
        description: "Backendutveckling med ASP.NET Core och Web API.",
        durationDays: 15,
        activities: [
            {
                id: "3",
                activityType: "Lecture",
                name: "Web API",
                description: "Introduktion till controllers och API-endpoints.",
                startTimeOffset: 1,
                durationMinutes: 120,
            },
            {
                id: "4",
                activityType: "Exercise",
                name: "Bygg ett REST API",
                description: "Skapa endpoints för en enkel resurs.",
                startTimeOffset: 3,
                durationMinutes: 180,
            },
        ],
    },
];
