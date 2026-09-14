import { useState } from "react";
import { Link } from "react-router";
import apiCall from "../functions/apiCall.ts";
import type { AuthResponse } from "../models/authResponse.ts";
import { useAuth } from "../context/auth/AuthContext.ts";
import { useCurrentUser } from "../context/currentUser/currentUserContext.ts";
import {useCurrentCourse} from "../context/course/CourseContext.ts";
import {loadSession} from "../functions/loadSession.ts";


export default function Login() {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const {setAccessToken} = useAuth();
    const {setUser} = useCurrentUser();
    const { setCourse } = useCurrentCourse();

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
                throw new Error("Login failed");
            }

            await loadSession(
                response.accessToken,
                setAccessToken,
                setUser,
                setCourse
            );

            setUserName("");
            setPassword("");
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Login failed"
            );
        }
    }
    return (
        <div className="p-6 flex flex-1 justify-center">
            <form
                className="w-full max-w-md bg-white rounded-2xl border border-slate-100 shadow-sm p-8 self-start"
                onSubmit={e => {
                e.preventDefault();
                handleSubmit();
                }}
            >
                <h2 className="text-xl font-bold text-slate-800 text-center">Medlemssidan</h2>

                <div className="mt-6 flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                    <label htmlFor="userName" className="text-xs font-semibold text-slate-600">Användarnamn</label>
                    <input id="userName" 
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm transition-colors focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" 
                        type="text"
                        autoComplete="username"
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="password" className="text-xs font-semibold text-slate-600">Lösenord</label>
                    <input id="password"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm transition-colors focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                {error && (
                    <p className="text-xs font-medium text-red-600 mt-1">{error}</p>
                )}

                <button type="submit" className="w-full mt-2 py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold rounded-xl shadow-sm">
                    Logga in
                </button>

                <div className="text-center mt-2">
                    <Link to="/register" className="text-xs text-slate-500 hover:text-blue-600 hover:underline transition-colors">
                        Har du inget konto? Registrera dig här!
                    </Link>
                </div>
            </div>
        </form>
        </div>
    );
}
