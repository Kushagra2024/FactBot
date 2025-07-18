import { createContext } from "react";

const ConversationThreadContext = createContext([
    {
        sender: "bot",
        text: "Hello, I am Fact Bot. Give me any topic and I'll share 7 fascinating facts about it. What would you like to learn about, today ?",
        status: "sent",
    },
]);

export default ConversationThreadContext;
