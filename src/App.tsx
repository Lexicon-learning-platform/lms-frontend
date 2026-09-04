import { Route, Routes } from "react-router-dom";
import Header from "./components/Header.tsx";
import Navbar from "./components/Navbar.tsx";
import Home from "./pages/Home.tsx";
import Modules from "./pages/Modules.tsx";
import Schedule from "./pages/Schedule.tsx";
import Footer from "./components/Footer.tsx";

function App() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col items-center">
            <Header />
            <Navbar />
            <main className="w-full max-w-[1440px] flex-1 px-12 py-8">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/modules" element={<Modules />} />
                    <Route path="/schedule" element={<Schedule />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
