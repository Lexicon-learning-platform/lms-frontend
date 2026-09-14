import type { ActivityType } from "./activity";
import type { Resource } from "./resource";

export interface ActivityExtended {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string | null;
    description: string;
    startOffset: number;
    duration: number;
    type: ActivityType;
    resources: Resource[];
}
