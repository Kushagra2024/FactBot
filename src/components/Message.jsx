function Avatar({ sender }) {
    return (
        <span>
            <img
                src={`/icons/${sender === "bot" ? "chat_icon" : "person"}.png`}
                alt="application logo"
                className={"w-10 aspect-square rounded-full p-1"}
            />
        </span>
    );
}

function ChatBubble({ sender, text, className }) {
    return (
        <div
            className={`w-3/4 p-2.5  rounded-xl flex flex-col gap-1 ${
                sender === "bot"
                    ? "bg-white dark:bg-gray-300"
                    : "bg-blue-600 text-gray-50"
            } ${className}`}
        >
            <p
                className="whitespace-pre-wrap"
                dangerouslySetInnerHTML={{
                    __html: text,
                }}
            />
        </div>
    );
}

function Message({ msg }) {
    const { sender, text, status } = msg;
    return (
        <div
            className={`justify-start flex gap-1 ${
                sender === "bot" ? "" : "flex-row-reverse"
            }`}
        >
            {/* avatar */}
            <Avatar sender={sender} />
            {/* message bubble */}
            {status === "pending" ? (
                <ChatBubble
                    sender={sender}
                    text={"Loading..."}
                    className={"animate-pulse"}
                />
            ) : status === "error" ? (
                <div className="px-3 py-1 flex justify-center items-center bg-red-400 rounded">
                    Something went wrong!
                </div>
            ) : (
                <ChatBubble sender={sender} text={text} />
            )}
        </div>
    );
}

export default Message;
export { Avatar, ChatBubble };
