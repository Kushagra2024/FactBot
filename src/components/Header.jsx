import { useState } from "react";
import { useEffect } from "react";
import ThemeToggler from "./ThemeToggler";

function Header({ heading, subheading, icon }) {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    // const setInternetConnection = () => {
    //     setIsOnline(navigator.onLine);
    // };

    useEffect(() => {
        const checkInternetConnection = async () => {
            try {
                const response = await fetch("https://www.google.com", {
                    method: "HEAD",
                    mode: "no-cors",
                });
                if (response.status === 0) {
                    setIsOnline(true);
                } else {
                    setIsOnline(false);
                }
            } catch (error) {
                setIsOnline(false);

                console.log(error);
            }
        };
        checkInternetConnection();

        // window.addEventListener("online", setInternetConnection);
        // window.addEventListener("offline", setInternetConnection);

        // return () => {
        //     window.removeEventListener("online", setInternetConnection);
        //     window.removeEventListener("offline", setInternetConnection);
        // };
    }, []);

    return (
        <div className="w-full p-4 bg-white dark:bg-gray-900 border border-gray-300 flex items-center justify-between ">
            <div className="flex items-center gap-3">
                <span>
                    <img
                        src={`../public/icons/${icon}.png`}
                        alt="application logo"
                        className="w-10 aspect-square rounded-full p-1 dark:bg-amber-50"
                    />
                </span>
                <div>
                    <h1 className="text-2xl font-bold dark:text-gray-50">
                        {heading}
                    </h1>
                    <h3 className="text-sm text-gray-400 font-semibold">
                        {subheading}
                    </h3>
                </div>
            </div>
            <div className="flex gap-4 justify-center items-center">
                {/* Theme */}
                <ThemeToggler />

                {/* Online Status */}
                <div className="bg-green-200 py-0.5 px-3 rounded-2xl flex justify-between items-center gap-1">
                    <span
                        className={`rounded-full aspect-square w-2 block mt-0.5 ${
                            isOnline ? "bg-green-400" : "bg-red-400"
                        }`}
                    ></span>
                    <p className="text-xs">{isOnline ? "Online" : "Offline"}</p>
                </div>
            </div>
        </div>
    );
}

export default Header;
