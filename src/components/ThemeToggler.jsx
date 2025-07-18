import { MoonIcon, SunIcon } from "@heroicons/react/16/solid";
import { useTheme } from "../hooks";

function ThemeToggler() {
    const { isThemeDark, setIsThemeDark } = useTheme();
    // bg-gray-100 dark:bg-gray-50
    return (
        <label className="w-16 h-8 rounded-2xl border-2 relative cursor-pointer dark:border-gray-200 bg-yellow-50 dark:bg-blue-50">
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
                className={`h-full aspect-square absolute top-0 left-0 rounded-full transition-transform duration-300 border-2 border-solid border-gray-100 p-0.5 bg-yellow-300 dark:bg-blue-300 ${
                    isThemeDark ? "translate-x-[120%] " : ""
                }`}
            >
                {isThemeDark ? (
                    <MoonIcon className="text-gray-900" />
                ) : (
                    <SunIcon className="text-gray-900" />
                )}
            </div>
        </label>
    );
}

export default ThemeToggler;
