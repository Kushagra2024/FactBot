import { useEffect, useState } from "react";
import ThemeContext from "./themeContext";
import { useAuth } from "../../hooks";

function ThemeProvider({ children }) {
    // console.log("theme provider -", Date.now().toLocaleString());

    const { user } = useAuth();
    // console.log("from auth - ", user);

    const [isThemeDark, setIsThemeDark] = useState(
        () => user?.chatPreference?.theme?.toLowerCase() === "true"
    );

    useEffect(() => {
        const htmlElement = document.querySelector("html");
        htmlElement.classList.remove("light", "dark");

        if (isThemeDark) {
            htmlElement.classList.add("dark");
        } else {
            htmlElement.classList.add("light");
        }
    }, [isThemeDark]);

    return (
        <ThemeContext.Provider value={{ isThemeDark, setIsThemeDark }}>
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeProvider;
