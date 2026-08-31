import { createContext } from "react";

export type User = {
    name: string;
    role: "student" | "teacher";
};

export const currentUserContext = createContext<User | null>(null);

