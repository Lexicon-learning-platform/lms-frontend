import { useState, type ReactNode } from "react";
import { currentUserContext, type User } from "./currentUserContext.ts";

export default function CurrentUserProvider({ children }: { children: ReactNode }) {
    const [user] = useState<User | null>({
        name: "Gunnar",
        role: "student",
    });

    return (
        <currentUserContext.Provider value={user}>
            {children}
        </currentUserContext.Provider>
    );
}
