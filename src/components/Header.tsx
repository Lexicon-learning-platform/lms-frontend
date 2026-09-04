import UserMenu from "./UserMenu.tsx";
import logo from "../assets/lexicon-logo.svg";

export default function Header() {
    return (
        <header className="w-full h-[72px] bg-white border-b border-slate-200 flex justify-center">
            <div className="w-full max-w-[1440px] px-12 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img
                        src={logo}
                        alt="Lexicon"
                        className="w-32"
                    />
                </div>

                <div className="flex items-center gap-3">
                    <UserMenu>Elevnamn...</UserMenu>
                </div>
            </div>
        </header>
    );
}
