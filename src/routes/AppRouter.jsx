import {
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
    Route,
} from "react-router-dom";
import IndexOutlet from "../components/IndexOutlet";
import Homepage from "../pages/Homepage";
import ConversationHistory from "../pages/ConversationHistory";
import Settings from "../pages/Settings";

const FactBotrouter = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<IndexOutlet />}>
                <Route index element={<Navigate to={"chat"} />} />
                <Route path="chat" element={<Homepage />} />
                {/* <Route
                    path="conversation-history"
                    element={<ConversationHistory />}
                /> */}
                <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<h1>Page not found</h1>} />
        </Route>
    )
);

export default FactBotrouter;
