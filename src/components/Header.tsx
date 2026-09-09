import UserMenu from "./UserMenu.tsx";
import logo from "../assets/lexicon-logo.svg";
import { useContext } from "react";
import { currentUserContext } from "../context/currentUserContext.ts";
import { Link } from "react-router-dom";

export default function Header() {
    const { user } = useContext(currentUserContext)!;

    return (
        <header className="w-full h-[72px] bg-white border-b border-slate-200 px-12 flex items-center">
            <div className="w-full px-12 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Link to="/">
                        <img
                            src={logo}
                            alt="Lexicon"
                            className="w-32"
                        />
                    </Link>
                </div>

                <div className="flex items-center gap-3">
                    {user ? (
                        <UserMenu>Elevnamn...</UserMenu>
                    ) : (
                        <Link
                            to="/login"
                            className="px-4 py-2 bg-slate-800 text-white rounded-md hover:bg-slate-700"
                        >
                            Logga in
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
