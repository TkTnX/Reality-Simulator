import { create } from "zustand";
import type { EThemes } from "../types";

interface ThemeStore {
  theme: EThemes | null;
  setTheme: (theme: EThemes) => void;
}

export const useThemeStore = create<ThemeStore>((set) => {
  const theme = localStorage.getItem("theme") as EThemes | null;
  console.log(theme);
  return {
    theme: Number(theme),
    setTheme: (theme) => set({ theme }),
  };
});
