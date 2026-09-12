import { useState } from "react";
import { Link } from "react-router";
import apiCall from "../functions/apiCall.ts";
import {useAuth} from "../context/auth/AuthContext.tsx";
import type {AuthResponse} from "../models/AuthResponse.ts";
import type {ApplicationUser} from "../models/applicationUser.ts";
import {authApiCall} from "../functions/authApiCall.ts";
import {useCurrentUser} from "../context/currentUser/currentUserContext.ts";

export default function Register() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const { setAccessToken } = useAuth();
    const {setUser} = useCurrentUser();

    async function handleSubmit() {
        setError("");
        setSuccess("");


        try {
            const response = await apiCall<AuthResponse>("/auth/register", {
                method: "POST",
                body: JSON.stringify({
                    username: userName,
                    password: password
                })
            });

            if (!response) {
                throw new Error("Registration failed");
            }

            const token = response.accessToken;

            setAccessToken(token);

            const userResponse = await authApiCall<ApplicationUser>(
                "/auth/getuser",
                token,
                setAccessToken
            );

            if (!userResponse) {
                throw new Error("Could not get user");
            }

            setUser(userResponse);
            setUserName("");
            setPassword("");
            setSuccess("Registration successful.");
            //todo fetch course


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
                <h2 className="text-xl font-bold">Register</h2>

                <div className="mt-3 grid gap-2">
                    <label htmlFor="text">
                        Name
                    </label>

                    <input
                        id="text"
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
