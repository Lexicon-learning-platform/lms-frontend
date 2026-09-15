export interface Activity {
    id: string;
    name: string | null;
    startOffset: number;
    duration: number;
    type: ActivityType;
}

export const activityTypes = [
    "Lecture",
    "SelfStudy",
    "Exercise",
    "Assignment",
    "Review"
] as const;

export type ActivityType = typeof activityTypes[number];
