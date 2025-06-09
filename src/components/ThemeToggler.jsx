import { useContext } from "react";
import { themeContext } from "../App";

function ThemeToggler() {
    const { isThemeDark, setIsThemeDark } = useContext(themeContext);

    return (
        <label className="w-12 h-6 rounded-xl border-2 relative cursor-pointer bg-gray-600 dark:bg-gray-50 dark:border-gray-200">
            <input
                type="checkbox"
                name="theme_toggle"
                checked={isThemeDark}
                onChange={(e) => {
                    setIsThemeDark(e.target.checked);
                }}
                className="opacity-0 cursor-pointer"
            />
            <div
                className={`h-full aspect-square bg-gray-50 dark:bg-gray-950 absolute top-0 left-0 rounded-full transition-transform duration-300 ${
                    isThemeDark ? "translate-x-[120%]" : ""
                }`}
            ></div>
        </label>
    );
}

export default ThemeToggler;
