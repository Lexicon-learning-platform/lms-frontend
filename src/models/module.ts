import type {Activity} from "./activity.ts";


export interface Module {
    id: string;
    name: string | null;
    description: string | null;
    durationDays: number | null;
    activities: Activity[];
}
