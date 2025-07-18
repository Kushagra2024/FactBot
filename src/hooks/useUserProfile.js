import { useContext } from "react";
import UserProfileContext from "../context/User_Profile/userProfileContext";

function useUserProfile() {
    const userProfileContext = useContext(UserProfileContext);

    if (!userProfileContext) {
        throw new Error(
            "useUserProfile hook must be called within a UserProfileProvider only"
        );
    }
    return userProfileContext;
}

export default useUserProfile;
