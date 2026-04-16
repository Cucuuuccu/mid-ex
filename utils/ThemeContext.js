import React, { createContext, useState, useContext, useEffect } from "react";
import { loadData, saveData } from "./storage";

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
    accent: "#6E6E6E",
    subText: "#6E6E6E",
    line: "#D9D9D9",
};

export const darkTheme = {
    background: "#2f2f2f",
    headerBg: "#000000",
    footerBg: "#000000",
    headerText: "#E0E0E0",
    text: "#E0E0E0",
    card: "#4d4d4d",
    accent: "#6E6E6E",
    subText: "#A0A0A0",
    line: "#1A1A2E",
};

export function ThemeProvider({ children }) {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const loadTheme = async () => {
            const savedTheme = await loadData("isDarkMode");
            if (savedTheme !== null) {
                setIsDark(savedTheme);
            }
        };
        loadTheme();
    }, []);

    const toggleTheme = async () => {
        const newMode = !isDark;
        setIsDark(newMode);
        await saveData("isDarkMode", newMode);
    };

    const theme = isDark ? darkTheme : lightTheme;

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme, theme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        return { isDark: false, toggleTheme: () => {}, theme: lightTheme };
    }
    return context;
};
