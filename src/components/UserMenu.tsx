import { useContext, useState } from "react";
import { currentUserContext } from "../context/currentUserContext.ts";
import { useAuth } from "../context/AuthContext.tsx";
import * as React from "react";

interface Props {
    children: React.ReactNode;
}

export default function UserMenu({ children }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    const { setUser } = useContext(currentUserContext)!;
    const { setAccessToken } = useAuth();

    async function handleLogout() {
        try {
            // todo
            // await logoutUser();

            setAccessToken(null);
            setUser(null);
        } catch (error) {
            console.error("Logout failed", error);
        }
    }

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="px-4 py-2 bg-slate-800 text-white rounded-md hover:bg-slate-700 transition-colors flex items-center gap-2"
            >
                {children}
                <span className="text-xs">▼</span>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-32 border bg-white p-2">
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full text-left p-2 hover:bg-gray-100"
                    >
                        Logga ut
                    </button>
                </div>
            )}
        </div>
    );
}
