import { useContext } from "react";
import ThemeContext from "../context/Theme/themeContext";

function useTheme() {
    const themeContext = useContext(ThemeContext);

    if (!themeContext) {
        throw new Error(
            "useTheme hook must be called within a ThemeProvider only"
        );
    }

    return themeContext;
}

export default useTheme;
