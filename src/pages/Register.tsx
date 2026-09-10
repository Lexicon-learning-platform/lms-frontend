import { useState } from "react";
import { Link } from "react-router";

export default function Register() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function handleSubmit() {
        setError("");
        setSuccess("");

        try {
            // todo
            // await registerUser(email, password);

            setUserName("");
            setPassword("");
            setSuccess("Registration successful. Check your email to verify your account.");
        } catch (error) {
            setError(error instanceof Error ? error.message : "Registration failed");
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
                <h2 className="text-xl font-bold">Register</h2>

                <div className="mt-3 grid gap-2">
                    <label htmlFor="email">
                        Email
                    </label>

                    <input
                        id="email"
                        className="border p-2 bg-white text-black"
                        type="email"
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
                        Register
                    </button>
                    {error && (
                        <p className="text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    {success && (
                        <p className="text-sm text-green-600">
                            {success}
                        </p>
                    )}
                    <Link
                        to="/login"
                        className="text-sm underline"
                    >
                        Already have an account?
                    </Link>
                </div>
            </form>
        </div>
    );
}
