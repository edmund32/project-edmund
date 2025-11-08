import { createContext, useEffect, useState } from "react";

const DarkModeContext = createContext();

const DarkModeContextProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Coba ambil dari localStorage dulu
    const storedPreference = localStorage.getItem("darkMode");
    if (storedPreference !== null) {
      return storedPreference === "true";
    }

    // Kalau belum ada, pakai preferensi sistem
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Simpan preferensi setiap kali berubah
  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  // Opsional: ubah class di <html> agar bisa dipakai Tailwind (dark:)
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const DarkMode = DarkModeContext;
export default DarkModeContextProvider;
