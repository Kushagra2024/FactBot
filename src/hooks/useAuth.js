import { useContext } from "react";
import AuthContext from "../context/Auth/authContext";

function useAuth() {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error(
            "useAuth hook must be called within a AuthProvider only"
        );
    }

    return authContext;
}

export default useAuth;
