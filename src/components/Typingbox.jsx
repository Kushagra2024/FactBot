import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import getGeminiResponse from "../utils/getResponse";

function Typingbox({ setMessages }) {
    const [userText, setUserText] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        if (userText.trim()) {
            setMessages((prevMsg) => [
                ...prevMsg,
                {
                    sender: "user",
                    text: userText,
                    status: "sent",
                },
            ]);

            let locallyStoredData = JSON.parse(
                localStorage.getItem("factBot-Conversation-Thread")
            );

            locallyStoredData = [
                ...locallyStoredData,
                { sender: "user", text: userText, status: "sent" },
            ];

            localStorage.setItem(
                "factBot-Conversation-Thread",
                JSON.stringify(locallyStoredData)
            );

            setUserText("");

            setTimeout(() => {
                setMessages((prevMsg) => [
                    ...prevMsg,
                    {
                        sender: "bot",
                        text: "",
                        status: "pending",
                    },
                ]);
            }, 500);

            try {
                const geminiResponse = await getGeminiResponse(e.target.value);
                setTimeout(() => {
                    setMessages((prevMsg) => [
                        ...prevMsg.slice(0, -1),
                        {
                            sender: "bot",
                            text: geminiResponse,
                            status: "sent",
                        },
                    ]);
                }, 500);

                locallyStoredData = [
                    ...locallyStoredData,
                    {
                        sender: "bot",
                        text: geminiResponse,
                        status: "sent",
                    },
                ];

                localStorage.setItem(
                    "factBot-Conversation-Thread",
                    JSON.stringify(locallyStoredData)
                );
            } catch (error) {
                console.log(error);

                setTimeout(() => {
                    setMessages((prevMsg) => [
                        ...prevMsg.slice(0, -1),
                        {
                            sender: "bot",
                            text: "",
                            status: "error",
                        },
                    ]);
                }, 500);
            }
        }
    }

    function handleKeyDown(e) {
        if (e.key === "Enter") {
            handleSubmit(e);
        }
    }
    return (
        <div className="flex flex-col gap-2 p-4 dark:bg-gray-900">
            <form
                className="w-full outline-1 outline-gray-300 border-none py-2 px-3 rounded flex items-center focus-within:outline-blue-300 focus-within:outline-2 dark:bg-gray-300"
                onSubmit={handleSubmit}
                onKeyDown={handleKeyDown}
            >
                <TextareaAutosize
                    minRows={1}
                    maxRows={5}
                    value={userText}
                    onChange={(e) => setUserText(e.target.value)}
                    placeholder="Ask me about any topic"
                    className="w-full outline-none border-none resize-none overflow-y-auto"
                />
                <button
                    className="ml-2.5 cursor-pointer hover:scale-110 active:scale-95"
                    type="submit"
                >
                    <PaperAirplaneIcon
                        className="h-5 w-5 transform -rotate-45"
                        color="blue"
                    />
                </button>
            </form>
            <p className="text-xs text-gray-500">Press Enter to Send</p>
        </div>
    );
}

export default Typingbox;
