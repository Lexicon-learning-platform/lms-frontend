import { useState } from "react";
import { Link } from "react-router";

export default function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit() {
        setError("");

        try {
            // todo
            // await loginUser(userName, password);

            console.log({
                userName,
                password
            });
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Login failed"
            );
        }
    }

    return (
        <div className="p-6 flex flex-1">
            <form
                className="border p-3 w-100 max-w-xl mx-auto self-start"
                onSubmit={e => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                <h2 className="text-xl font-bold">
                    Login
                </h2>

                <div className="mt-3 grid gap-2">
                    <label htmlFor="userName">
                        Username
                    </label>

                    <input
                        id="userName"
                        className="border p-2 bg-white text-black"
                        type="text"
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                    />

                    <label htmlFor="password">
                        Password
                    </label>

                    <input
                        id="password"
                        className="border p-2 bg-white text-black"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <button
                        className="border p-2 font-bold hover:bg-gray-100"
                        type="submit"
                    >
                        Login
                    </button>

                    {error && (
                        <p className="text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    <Link
                        to="/register"
                        className="text-sm underline"
                    >
                        Don't have an account?
                    </Link>
                </div>
            </form>
        </div>
    );
}
