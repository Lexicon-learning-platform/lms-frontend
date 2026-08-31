import {NavLink} from "react-router-dom";
import {currentUserContext} from "../context/currentUserContext.ts";
import {useContext} from "react";

export default function Navbar() {

    const user = useContext(currentUserContext);


    return (
        <nav className="flex items-center border-b justify-around">
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
        </nav>
    );
}
