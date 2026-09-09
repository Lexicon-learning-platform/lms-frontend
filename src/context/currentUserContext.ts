import { createContext, type Dispatch, type SetStateAction } from "react";

export type User = {
    name: string;
    role: "student" | "teacher";
};

export type CurrentUserContextType = {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
};

export const currentUserContext =
    createContext<CurrentUserContextType | null>(null);
