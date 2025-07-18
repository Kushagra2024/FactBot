import { useContext } from "react";
import ConversationThreadContext from "../context/Conversation_Thread/conversationThreadContext";

function useConversationThread() {
    const conversationThreadContext = useContext(ConversationThreadContext);

    if (!conversationThreadContext) {
        throw new Error(
            "useTheme hook must be called within a ThemeProvider only"
        );
    }

    return conversationThreadContext;
}

export default useConversationThread;
