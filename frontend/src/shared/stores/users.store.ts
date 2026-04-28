import { create } from "zustand";
import type { IUser } from "../types";

interface UsersStore {
    user: null | IUser
    setUser: (data: IUser | null) => void
}


export const useUsersStore = create<UsersStore>((set) => ({
    user: null,
    setUser: (data) => set({user: data})
}));

