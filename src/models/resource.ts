export interface Resource {
    id: string;
    createdBy: UserSimple;
    name: string;
    description: string;
    type: ResourceType;
    data: string;
}

export interface UserSimple {
    id: string;
    givenName: string;
    lastName: string;
}

export const resourceTypes = [
    "Text",
    "URL",
    "AssignmentTurnin",
    "ExternalFile"
] as const;

export type ResourceType = typeof resourceTypes[number];
