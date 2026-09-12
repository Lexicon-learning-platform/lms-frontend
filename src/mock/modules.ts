// mock/modules.ts

import type { Module } from "../models/module";

export const modules: Module[] = [
    {
        id: "1",
        name: "React",
        description: "Introduktion till React och komponentbaserad utveckling.",
        duration: 20,
        activities: [
            {
                id: "1",
                type: "Lecture",
                name: "React Router",
                startOffset: 2,
                duration: 120,
            },
            {
                id: "2",
                type: "Assignment",
                name: "React Components",
                startOffset: 5,
                duration: 180,
            },
        ],
    },
    {
        id: "2",
        name: "ASP.NET Core",
        description: "Backendutveckling med ASP.NET Core och Web API.",
        duration: 15,
        activities: [
            {
                id: "3",
                type: "Lecture",
                name: "Web API",
                startOffset: 1,
                duration: 120,
            },
            {
                id: "4",
                type: "Exercise",
                name: "Bygg ett REST API",
                startOffset: 3,
                duration: 180,
            },
        ],
    },
];
