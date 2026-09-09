import { useState, type ReactNode } from "react";
import { currentUserContext, type User } from "./currentUserContext.ts";

export default function CurrentUserProvider({ children }: { children: ReactNode }) {
    // Mock logged-in user for testing
    const [user, setUser] = useState<User | null>({
        name: "Maria",
        role: "student"
    });

    //const [user, setUser] = useState<User | null>(null);

    return (
        <currentUserContext.Provider value={{ user, setUser }}>
            {children}
        </currentUserContext.Provider>
    );
}
