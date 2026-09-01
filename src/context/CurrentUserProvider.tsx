import { useState, type ReactNode } from "react";
import { currentUserContext} from "./currentUserContext.ts";
import type {ApplicationUser} from "../models/applicationUser.ts";

export default function CurrentUserProvider({ children }: { children: ReactNode }) {
    const [user] = useState<ApplicationUser | null>({
        userId: "00000000-0000-0000-0000-000000000000",
        givenName: "Gunnar",
        lastName: "Test",
        courseId: 1,
    });


    return (
        <currentUserContext.Provider value={user}>
            {children}
        </currentUserContext.Provider>
    );
}
