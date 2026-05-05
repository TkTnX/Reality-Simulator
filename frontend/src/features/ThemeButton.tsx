import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";
import { EThemes } from "../shared";
import { useThemeStore } from "../shared/stores";

export const ThemeButton = () => {
  const { setTheme, theme } = useThemeStore();
  console.log({ theme, d: EThemes.dark });
  const onChangeTheme = () => {
    localStorage.setItem(
      "theme",
      theme === EThemes.dark ? String(EThemes.light) : String(EThemes.dark),
    );
    setTheme(theme === EThemes.dark ? EThemes.light : EThemes.dark);
  };

  useEffect(() => {
    if (theme === EThemes.dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <button
      onClick={onChangeTheme}
      className="flex items-center gap-10 bg-gray-100 p-3 rounded-full relative"
    >
      <Sun
        className={`relative transition z-1 ${theme === EThemes.light ? "stroke-white" : "stroke-black"}`}
      />
      <Moon
        className={`relative transition z-1 ${theme === EThemes.dark ? "stroke-white" : "stroke-black"}`}
      />
      <div
        className={`bg-black  w-10 h-10  rounded-full transition absolute left-1 ${theme === EThemes.light ? "translate-x-0" : "translate-x-16"}`}
      />
    </button>
  );
};
