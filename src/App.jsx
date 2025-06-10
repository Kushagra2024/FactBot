import { createContext, useEffect, useState } from "react";
import Factbot from "./components/Factbot";

export const themeContext = createContext(false);
export const conversationThreadContext = createContext([
    {
        sender: "bot",
        text: "Hello, I am Fact Bot. Give me any topic and I'll share 7 fascinating facts about it. What would you like to learn about, today ?",
        status: "sent",
    },
]);
export const userProfileContext = createContext({
    name: "",
    email: "",
    avatar_url: "/icons/person.png",
});

function App() {
    const [isThemeDark, setIsThemeDark] = useState(false);

    const [messages, setMessages] = useState([
        {
            sender: "bot",
            text: "Hello, I am Fact Bot. Give me any topic and I'll share 7 fascinating facts about it. What would you like to learn about, today ?",
            status: "sent",
        },
    ]);

    const [userProfile, setUserProfile] = useState({
        name: "",
        email: "",
        avatar_url: "/public/icons/person.png",
    });

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
        <themeContext.Provider value={{ isThemeDark, setIsThemeDark }}>
            <userProfileContext.Provider
                value={{ userProfile, setUserProfile }}
            >
                <conversationThreadContext.Provider
                    value={{ messages, setMessages }}
                >
                    <Factbot />
                </conversationThreadContext.Provider>
            </userProfileContext.Provider>
        </themeContext.Provider>
    );
}

export default App;
