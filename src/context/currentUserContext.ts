import { createContext } from "react";
import type { ApplicationUser } from "../models/applicationUser";

export const currentUserContext = createContext<ApplicationUser | null>(null);

