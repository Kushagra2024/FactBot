import { useState } from "react";
import ConversationThreadContext from "./conversationThreadContext";

function ConversationThreadProvider({ children }) {
    const [messages, setMessages] = useState([
        {
            sender: "bot",
            text: "Hello, I am Fact Bot. Give me any topic and I'll share 7 fascinating facts about it. What would you like to learn about, today ?",
            status: "sent",
        },
    ]);

    return (
        <ConversationThreadContext.Provider value={{ messages, setMessages }}>
            {children}
        </ConversationThreadContext.Provider>
    );
}

export default ConversationThreadProvider;
