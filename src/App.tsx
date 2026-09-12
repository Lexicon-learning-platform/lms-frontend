import { Route, Routes } from "react-router-dom";
import Header from "./components/Header.tsx";
import Navbar from "./components/Navbar.tsx";
import Home from "./pages/Home.tsx";
import Modules from "./pages/Modules.tsx";
import Schedule from "./pages/Schedule.tsx";
import Footer from "./components/Footer.tsx";
import {useCurrentUser} from "./context/currentUser/currentUserContext.ts";
import PublicHome from "./pages/PublicHome.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Submissions from "./pages/Submissions.tsx";
import apiCall from "./functions/apiCall.ts";
import type {AuthResponse} from "./models/authResponse.ts";

import {useEffect} from "react";
import {useCurrentCourse} from "./context/course/CourseContext.ts";
import {useAuth} from "./context/auth/AuthContext.ts";
import {loadSession} from "./functions/loadSession.ts";

function App() {

    const { setAccessToken } = useAuth();
    const { user, setUser } = useCurrentUser();
    const { setCourse } = useCurrentCourse();


    useEffect(() => {
        async function restoreSession() {
            try {
                console.log("1. restoring session");

                const authResponse = await apiCall<AuthResponse>(
                    "/auth/token",
                    {
                        method: "POST"
                    }
                );

                console.log("2. token response:", authResponse);

                if (!authResponse) {
                    console.log("3. no auth response");
                    return;
                }

                console.log("3. loading session");

                await loadSession(
                    authResponse.accessToken,
                    setAccessToken,
                    setUser,
                    setCourse
                );

                console.log("4. session loaded");
            } catch (error) {
                if (error instanceof Error) {
                    console.log("RESTORE SESSION ERROR:", error.message);
                } else {
                    console.log("RESTORE SESSION ERROR:", error);
                }

                setAccessToken(null);
                setUser(null);
                setCourse(null);
            }
        }

        restoreSession();
    }, [setAccessToken, setUser, setCourse]);


    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col items-center">
            <Header />

            {/* TODO: Decide whether logged-out users should have a navbar or not */}
            {user &&
                <Navbar />
            }

            <main className="w-full max-w-[1680px] mx-auto flex-1 px-4 md:px-12 py-6 md:py-8 flex flex-col">
                {user ? (
                    <Routes>
                        <Route path="/" element={<PublicHome />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/modules" element={<Modules />} />
                        <Route path="/schedule" element={<Schedule />} />
                        <Route path="/submissions" element={<Submissions />} />
                    </Routes>
                ) : (
                    <Routes>
                        <Route path="/" element={<PublicHome />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                )}
            </main>

            <Footer />
        </div>
    );
}
export default App;
