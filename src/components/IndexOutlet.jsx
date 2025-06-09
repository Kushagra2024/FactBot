import { Outlet } from "react-router-dom";
import SideNavbar from "./SideNavbar";

function IndexOutlet() {
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
