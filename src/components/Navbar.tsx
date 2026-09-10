import { NavLink } from "react-router-dom";
import { currentUserContext } from "../context/currentUserContext.ts";
import { useContext, useState } from "react";

export default function Navbar() {
    const { user } = useContext(currentUserContext)!;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="w-full bg-white border-b border-slate-200 flex justify-center text-xs font-medium text-slate-500 relative z-40">
            <div className="w-full max-w-[1440px] px-4 md:px-12 flex flex-col md:flex-row md:items-center justify-start">
                <div className="h-[48px] flex items-center justify-between w-full md:w-auto md:mr-8">
                    {user?.role === "teacher" ? (
                        <button>Webbutveckling ▾</button>
                    ) : (
                        <span>Webbutveckling</span>
                    )}

                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-slate-600 hover:text-slate-900 text-base">
                        {mobileMenuOpen ? 'x' : 'o'}
                    </button>

                    {/* <span className="h-5 w-px bg-slate-300" aria-hidden="true" /> */}
                </div>
                
                <div className={`${mobileMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row gap-4 md:gap-6 pb-4 md:pb-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 bg-white w-full md:w-auto`}>
                    <NavLink onClick={() => setMobileMenuOpen(false)} to="/">Hem</NavLink>
                    <NavLink onClick={() => setMobileMenuOpen(false)} to="/modules">Moduler</NavLink>
                    <NavLink onClick={() => setMobileMenuOpen(false)} to="/schedule">Schema</NavLink>
                    <NavLink onClick={() => setMobileMenuOpen(false)} to="/submissions">Inlämningar</NavLink>
                </div>
            </div>
        </nav>
    );
}