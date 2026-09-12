import { Route, Routes } from "react-router-dom";
import Header from "./components/Header.tsx";
import Navbar from "./components/Navbar.tsx";
import Home from "./pages/Home.tsx";
import Modules from "./pages/Modules.tsx";
import Schedule from "./pages/Schedule.tsx";
import Footer from "./components/Footer.tsx";
import {useContext} from "react";
import {currentUserContext} from "./context/currentUser/currentUserContext.ts";
import PublicHome from "./pages/PublicHome.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Submissions from "./pages/Submissions.tsx";

function App() {
    const { user } = useContext(currentUserContext)!;

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col items-center">
            <Header />
            <Navbar />

            <main className="w-full max-w-[1680px] mx-auto flex-1 px-4 md:px-12 py-6 md:py-8 flex flex-col">

            {user ? ( // todo change to auth later when fully implemented
                    <>
                        <Routes>
                            <Route path="/" element={<PublicHome />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/modules" element={<Modules />} />
                            <Route path="/schedule" element={<Schedule />} />
                            <Route path="/submissions" element={<Submissions />} />
                        </Routes>
                    </>
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
