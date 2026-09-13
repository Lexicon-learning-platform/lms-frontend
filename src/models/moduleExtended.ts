

import type { Activity } from "./activity.ts";
import type {Resource} from "./resource.ts";

export interface ModuleExtended {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    description: string;
    startOffset: number | null;
    duration: number;
    activities: Activity[];
    resources: Resource[];
}
