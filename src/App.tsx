import { Route, Routes } from "react-router-dom";
import Header from "./components/Header.tsx";
import Navbar from "./components/Navbar.tsx";
import Home from "./pages/Home.tsx";
import Modules from "./pages/Modules.tsx";
import Schedule from "./pages/Schedule.tsx";

function App() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/modules" element={<Modules />} />
                <Route path="/schedule" element={<Schedule />} />


            </Routes>
        </div>
    );
}

export default App;
