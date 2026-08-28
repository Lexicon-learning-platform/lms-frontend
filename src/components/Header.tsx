import UserMenu from "./UserMenu.tsx";
import logo from "../assets/lexicon-logo.svg";

export default function Header() {
    return (
        <header className="flex items-center justify-between border-b">
            <img
                src={logo}
                alt="Lexicon"
                className="w-32"
            />

            <UserMenu>Elevnamn...</UserMenu>
        </header>
    );
}
