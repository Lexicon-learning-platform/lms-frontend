import type { ActivityType } from "./activity";

export interface ActivitySimple {
    id: string;
    name: string | null;
    startOffset: number;
    duration: number;
    type: ActivityType;
}