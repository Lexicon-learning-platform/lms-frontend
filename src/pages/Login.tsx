import { useState } from "react";
import { Link } from "react-router";
import apiCall from "../functions/apiCall.ts";
import type {AuthResponse} from "../models/AuthResponse.ts";
import {useAuth} from "../context/AuthContext.tsx";

export default function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { accessToken, setAccessToken } = useAuth();

    async function handleSubmit() {
        setError("");

        try {
            const response = await apiCall<AuthResponse>("/auth/login", {
                method: "POST",
                body: JSON.stringify({
                    username: userName,
                    password: password
                })
            });

            if (!response) {
                throw new Error("Registration failed");
            }



            console.log(accessToken);
            console.log(response);

            //todo call and set user, call and set course




            setAccessToken(response.accessToken);
            setUserName("");
            setPassword("");
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Registration failed"
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
