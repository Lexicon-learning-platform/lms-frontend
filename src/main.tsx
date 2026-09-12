import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.tsx";
import CurrentUserProvider from "./context/currentUser/CurrentUserProvider.tsx";
import AuthProvider from "./context/auth/AuthProvider.tsx";
import CurrentCourseProvider from "./context/course/ CourseProvider.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <CurrentUserProvider>
                <CurrentCourseProvider>
                    <AuthProvider>
                        <App />
                    </AuthProvider>
                </CurrentCourseProvider>
            </CurrentUserProvider>
        </BrowserRouter>
    </StrictMode>,
);
