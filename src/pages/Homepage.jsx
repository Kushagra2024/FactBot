import { useContext } from "react";
import Chatbox from "../components/Chatbox";
import Header from "../components/Header";
import Typingbox from "../components/Typingbox";
import { useEffect } from "react";
import { conversationThreadContext } from "../App";

function Homepage() {
    const { messages, setMessages } = useContext(conversationThreadContext);

    useEffect(() => {
        let locallyStoredChat = JSON.parse(
            localStorage.getItem("factBot-Conversation-Thread")
        );

        if (locallyStoredChat) {
            setMessages(locallyStoredChat);
            return;
        }

        localStorage.setItem(
            "factBot-Conversation-Thread",
            JSON.stringify([
                {
                    sender: "bot",
                    text: "Hello, I am Fact Bot. Give me any topic and I'll share 7 fascinating facts about it. What would you like to learn about, today ?",
                    status: "sent",
                },
            ])
        );
    }, []);

    return (
        <div className="h-screen col-span-4 flex flex-col col-start-2">
            {/* header */}
            <Header
                heading={"Chat"}
                subheading={"Ask me about any topic for interesting facts"}
                icon={"chat_icon"}
            />

            {/* chats display */}
            <Chatbox messages={messages} />

            {/* typing area */}
            <Typingbox setMessages={setMessages} />
        </div>
    );
}

export default Homepage;
