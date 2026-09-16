import type { ResourceType, UserSimple } from "./resource";

export interface TurnIn {
    id: string;
    activityId: string;
    createdBy: UserSimple;
    name: string;
    description: string;
    type: ResourceType;
    data: string;
}