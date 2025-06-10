import { useContext, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { userProfileContext } from "../App";

function SideNavbar() {
    const { userProfile, setUserProfile } = useContext(userProfileContext);

    useEffect(() => {
        const locallyStoredSettings = JSON.parse(
            localStorage.getItem("settings")
        );

        if (locallyStoredSettings) {
            setUserProfile((prev) => {
                return {
                    ...prev,
                    name: `${locallyStoredSettings.first_name} ${locallyStoredSettings.last_name}`,
                    email: locallyStoredSettings.email,
                };
            });
            return;
        }
    }, []);

    return (
        <nav className="col-span-1 flex flex-col fixed top-0 left-0 w-1/5 h-full">
            {/* Logo */}
            <div className="w-full">
                <Link
                    to={"/"}
                    className="w-full px-4 py-[17px] bg-white border border-gray-300 flex justify-center items-center gap-4 dark:bg-gray-900"
                >
                    <img
                        src="/icons/chat_icon.png"
                        alt="application logo"
                        className="w-[50px] aspect-square border-2 border-blue-600 rounded-[15px] p-0.5 bg-blue-50"
                    />
                    <p className="text-2xl font-bold dark:text-gray-50">
                        FactBot
                    </p>
                </Link>
            </div>

            {/* nav links */}
            <div className="bg-white grow-1 border border-gray-300 px-3 py-4 flex flex-col gap-6 dark:bg-gray-900">
                <ul className="flex flex-col gap-2 dark:text-gray-50">
                    <li>
                        <NavLink
                            to={"chat"}
                            className={({ isActive }) =>
                                `${
                                    isActive
                                        ? "bg-gray-700 text-white dark:bg-blue-50 dark:text-gray-600"
                                        : ""
                                } flex items-center p-3 gap-4 rounded-2xl hover:bg-blue-200 hover:text-blue-400`
                            }
                        >
                            <span>
                                <img
                                    src="../public/icons/chat_icon_2.png"
                                    className="aspect-square w-7"
                                />
                            </span>
                            <p>Chat</p>
                        </NavLink>
                    </li>
                    {/* <li>
                        <NavLink
                            to={"conversation-history"}
                            className={({ isActive }) =>
                                `${
                                    isActive ? "bg-gray-700 text-white" : ""
                                } flex items-center p-3 gap-4 rounded-2xl hover:bg-blue-200 hover:text-blue-400`
                            }
                        >
                            <span>
                                <img
                                    src="../public/icons/conversation_history.png"
                                    className="aspect-square w-7"
                                />
                            </span>
                            <p>Conversation History</p>
                        </NavLink>
                    </li> */}
                    <li>
                        <NavLink
                            to={"settings"}
                            className={({ isActive }) =>
                                `${
                                    isActive
                                        ? "bg-gray-700 text-white dark:bg-blue-50 dark:text-gray-600"
                                        : ""
                                } flex items-center p-3 gap-4 rounded-2xl hover:bg-blue-200 hover:text-blue-400`
                            }
                        >
                            <span>
                                <img
                                    src="/public/icons/setting.png"
                                    className="aspect-square w-7"
                                />
                            </span>
                            <p>User Settings</p>
                        </NavLink>
                    </li>
                </ul>
                <span className="bg-gray-200 w-full h-0.5 block"></span>
                {/* Profile link */}
                {userProfile.name && userProfile.email && (
                    <div className="w-full flex flex-col gap-2">
                        <div className="flex gap-2 px-2">
                            <span>
                                <img
                                    src={userProfile.avatar_url}
                                    alt=""
                                    className="aspect-square w-11"
                                />
                            </span>
                            <div className="flex flex-col">
                                <p>{userProfile.name}</p>
                                <p className="text-xs text-gray-500">
                                    {userProfile.email}
                                </p>
                            </div>
                        </div>
                        {/* <div>
                            <button
                                className="w-full rounded-2xl bg-gray-200 p-2 active:scale-95 hover:bg-blue-200 cursor-pointer"
                                onClick={handleUserLogout}
                            >
                                Logout
                            </button>
                        </div> */}
                    </div>
                )}
            </div>
        </nav>
    );
}

export default SideNavbar;
