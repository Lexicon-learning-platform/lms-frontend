import { useContext, useState } from "react";
import { currentUserContext } from "../context/currentUser/currentUserContext.ts";
import { useAuth } from "../context/auth/AuthContext.tsx";
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
            //await logoutUser();

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
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 text-sm font-medium text-slate-700"
            >
                {children}
                <span className="text-xs text-slate-400">
                    {isOpen ? '▲' : '▼'}
                </span>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50 text-sm">
                    <a href="#" className="block px-4 py-2 text-slate-700 hover:bg-slate-50">
                        Profil
                    </a>
                    <a href="#" className="block px-4 py-2 text-slate-700 hover:bg-slate-50">
                        Inställningar
                    </a>
                    <hr className="my-1 border-slate-100" />
                    <button
                        className="block px-4 py-2 text-slate-700 hover:bg-slate-50"
                        type="button"
                        onClick={handleLogout}
                    >
                        Logga ut
                    </button>
                </div>
            )}
        </div>
    );
}
