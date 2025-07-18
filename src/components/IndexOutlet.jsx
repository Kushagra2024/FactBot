import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import SideNavbar from "./SideNavbar";
import { useAuth } from "../hooks";
import { useNavigate } from "react-router-dom";

function IndexOutlet() {
    const { isUserAuthenticated } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (!isUserAuthenticated) {
            navigate("/login", {
                replace: true,
            });
        }
    }, [isUserAuthenticated]);

    // console.log("index outlet -", Date.now().toLocaleString());
    // console.log(isUserAuthenticated);

    return (
        <div className="w-full h-full grid grid-cols-5 relative">
            {/* side navigation bar */}
            <SideNavbar />
            {/* main page */}
            <Outlet />
        </div>
    );
}

export default IndexOutlet;
