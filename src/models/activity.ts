export interface Activity {
    id: string;
    name: string | null;
    startOffset: number;
    duration: number;
    type: ActivityType;
}

export const activityTypes = [
    "Elearn",
    "Lecture",
    "Exercise",
    "Assignment",
    "SelfStudy",
    "Other"
] as const;

export type ActivityType = typeof activityTypes[number];
