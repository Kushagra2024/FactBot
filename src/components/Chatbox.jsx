import { useContext, useEffect, useRef } from "react";
import Message from "./Message";
import { themeContext } from "../App";

function Chatbox({ messages }) {
    const endChatRef = useRef(null);
    const { isThemeDark } = useContext(themeContext);

    useEffect(() => {
        endChatRef.current?.scrollIntoView({ Behavior: "smooth" });
    }, [messages]);
    return (
        <div
            className={`w-full bg-blue-50 dark:bg-gray-800 p-3 flex flex-col gap-3 grow-1 overflow-y-auto custom-scrollbar ${
                isThemeDark ? "custom-scrollbar-dark" : ""
            }`}
        >
            {messages.map((msg, index) => (
                <Message key={index} msg={msg} />
            ))}
            <div ref={endChatRef} />
        </div>
    );
}

export default Chatbox;
