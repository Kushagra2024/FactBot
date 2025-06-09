import { useEffect, useRef } from "react";
import Message from "./Message";

function Chatbox({ messages }) {
    const endChatRef = useRef(null);

    useEffect(() => {
        endChatRef.current?.scrollIntoView({ Behavior: "smooth" });
    }, [messages]);
    return (
        <div className="w-full bg-blue-50 dark:bg-gray-900 p-3 flex flex-col gap-3 grow-1 overflow-y-auto">
            {messages.map((msg, index) => (
                <Message key={index} msg={msg} />
            ))}
            <div ref={endChatRef} />
        </div>
    );
}

export default Chatbox;
