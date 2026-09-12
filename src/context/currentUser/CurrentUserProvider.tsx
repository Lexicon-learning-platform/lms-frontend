
import { useState, type ReactNode } from "react";
import { currentUserContext } from "./currentUserContext.ts";
import type {ApplicationUser} from "../../models/applicationUser.ts";

export default function CurrentUserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<ApplicationUser | null>(null);

    return (
        <currentUserContext.Provider value={{ user, setUser }}>
            {children}
        </currentUserContext.Provider>
    );
}
