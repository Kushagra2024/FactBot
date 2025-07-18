import {
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
    Route,
} from "react-router-dom";
import IndexOutlet from "../components/IndexOutlet";
import Home from "../pages/Home";
import Settings from "../pages/Settings";
import Login from "../pages/Login";
import ConversationHistory from "../pages/ConversationHistory";

const FactBotrouter = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<IndexOutlet />}>
                <Route index element={<Navigate to={"chat"} />} />
                <Route path="chat" element={<Home />} />
                <Route
                    path="conversation-history"
                    element={<ConversationHistory />}
                />
                <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="/register" element={""} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<h1>Page not found</h1>} />
        </>
    )
);

export default FactBotrouter;
