import { Link } from "react-router-dom";

export default function Login() {
    return (
        <div className="flex flex-1 ">
            LoginPage

            <Link
                to="/register"
                className="px-4"
            >
                Registrera dig
            </Link>
        </div>
    );
}
