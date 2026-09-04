import {NavLink} from "react-router-dom";
import {currentUserContext} from "../context/currentUserContext.ts";
import {useContext} from "react";

export default function Navbar() {
    const user = useContext(currentUserContext);
    return (
        <nav className="w-full h-[48px] bg-white border-b border-slate-200 flex justify-center text-xs font-medium text-slate-500">
            <div className="w-full max-w-[1440px] px-12 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    {user?.role === "teacher" ? (
                    <button>
                        Webbutveckling ▾
                    </button>
                    ) : (
                        <span>
                            Webbutveckling
                        </span>
                    )}

                    <NavLink to="/">Hem</NavLink>
                    <NavLink to="/modules">Moduler</NavLink>
                    <NavLink to="/schedule">Schema</NavLink>
                    <NavLink to="/submissions">Inlämningar</NavLink>
                </div>
            </div>
        </nav>
    );
}
