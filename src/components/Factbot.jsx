import { RouterProvider } from "react-router-dom";
import FactBotrouter from "../routes/AppRouter";

function Factbot() {
    return <RouterProvider router={FactBotrouter} />;
}

export default Factbot;
