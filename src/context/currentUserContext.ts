import {createContext, type Dispatch, type SetStateAction, useContext} from "react";

import type { ApplicationUser } from "../models/applicationUser.ts";

export type CurrentUserContextType = {
    user: ApplicationUser | null;
    setUser: Dispatch<SetStateAction<ApplicationUser | null>>;
};

export const currentUserContext =
    createContext<CurrentUserContextType | null>(null);

export function useCurrentUser() {
    const context = useContext(currentUserContext);

    if (!context) {
        throw new Error("useCurrentUser must be used within CurrentUserProvider");
    }

    return context;
}


