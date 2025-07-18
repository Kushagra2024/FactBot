import { createContext } from "react";

const UserProfileContext = createContext({
    name: "",
    email: "",
    avatar_url: "/icons/person.png",
});

export default UserProfileContext;
