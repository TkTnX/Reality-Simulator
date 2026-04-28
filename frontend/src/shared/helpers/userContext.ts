import { createContext } from "react-router";
import type { IUser } from "../types";

export const userContext = createContext<IUser | null>(null);
