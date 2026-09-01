

export interface Activity {
    id: string;
    activityType: ActivityType;
    name: string | null;
    description: string | null;
    startTimeOffset: number;
    durationMinutes: number;
}

export type ActivityType =
    | "Elearn"
    | "Lecture"
    | "Exercise"
    | "Assignment"
    | "Other";
