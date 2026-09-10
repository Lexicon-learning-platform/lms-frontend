import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.tsx";
import CurrentUserProvider from "./context/CurrentUserProvider.tsx";
import AuthProvider from "./context/AuthProvider.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <CurrentUserProvider>
            <BrowserRouter>
                <AuthProvider>
                    <CurrentUserProvider>
                        <App />
                    </CurrentUserProvider>
                </AuthProvider>
            </BrowserRouter>
        </CurrentUserProvider>
    </StrictMode>,
);
