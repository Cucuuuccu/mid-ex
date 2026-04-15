import React, { createContext, useContext, useState, useEffect } from "react";
import { saveData, loadData } from "./storage";

const ThemeContext = createContext({
    isDark: false,
    toggleTheme: () => {},
    theme: {},
});

export const lightTheme = {
    background: "#D9D9D9",
    headerBg: "#FFFFFF",
    footerBg: "#FFFFFF",
    headerText: "#333333",
    text: "#333333",
    card: "#C2C2C2",
};

export const darkTheme = {
    background: "#2f2f2f",
    headerBg: "#000000",
    footerBg: "#000000",
    headerText: "#E0E0E0",
    text: "#E0E0E0",
    card: "#4d4d4d",
};

export function ThemeProvider({ children }) {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        loadData("dark_mode").then((val) => {
            if (val === true) setIsDark(true);
        });
    }, []);

    const toggleTheme = () => {
        setIsDark((prev) => {
            const next = !prev;
            saveData("dark_mode", next);
            return next;
        });
    };

    const theme = isDark ? darkTheme : lightTheme;

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme, theme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
