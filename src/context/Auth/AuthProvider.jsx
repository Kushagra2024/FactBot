import {
    useLayoutEffect,
    useState,
    useEffect,
    useMemo,
    useCallback,
} from "react";
import AuthContext from "./authContext";
import { getuser, loginUser, logoutUser } from "../../api/api";
import { useMutation, useQuery } from "@tanstack/react-query";

function AuthProvider({ children }) {
    // console.log("auth provider -", Date.now().toLocaleString());

    // const now = Date.now();
    // while (Date.now() - now < 2000);

    const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    // states for login/logout functionality
    const [isloading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(null);

    // to prevent auth status retries
    const [isAuthCheckDone, setIsAuthCheckDone] = useState(false);

    // auth check on initial app load
    const {
        isLoading: isAuthStatusLoading,
        isSuccess: isAuthSuccess,
        isError: isAuthError,
        data: authData,
    } = useQuery({
        queryKey: ["me"],
        queryFn: getuser,
        enabled: !isAuthCheckDone,
        retry: false,
    });

    // console.log(isAuthStatusLoading);

    // function for handling login
    const loginMutation = useMutation({
        mutationFn: loginUser,
        mutationKey: ["login"],
        onSuccess: (data) => {
            setUser(data);
            setIsUserAuthenticated(true);
            setIsLoading(false);
        },
        onError: (err) => {
            setIsError(true);
            setError(err);
            setIsLoading(false);
        },
    });

    const logoutMutation = useMutation({
        mutationFn: logoutUser,
        mutationKey: ["logout"],
        onSuccess: () => {
            setUser(null);
            setIsUserAuthenticated(false);
            setIsLoading(false);
        },
        onError: (err) => {
            setIsError(true);
            setError(err);
            setIsLoading(false);
        },
    });

    // actual exported login function
    const login = useCallback(
        (loginFormData) => {
            setIsError(false);
            setError(null);
            setIsLoading(true);
            loginMutation.mutate(loginFormData);
        },
        [loginMutation]
    );

    const logout = useCallback(() => {
        setIsError(false);
        setError(null);
        setIsLoading(true);
        logoutMutation.mutate();
    }, [logoutMutation]);

    useLayoutEffect(() => {
        // console.log("inside useEffect - ", Date.now().toLocaleString());
        if (isAuthSuccess) {
            setUser(authData);
            setIsUserAuthenticated(true);
            setIsAuthCheckDone(true);
        } else if (isAuthError) {
            // console.log("inside else if");
            setUser(null);
            setIsUserAuthenticated(false);
            setIsAuthCheckDone(true);
        }
    }, [isAuthError, isAuthSuccess, authData]);

    // console.log("auth provider before loader -", Date.now().toLocaleString());

    // loading page if user auth status is loading or user data is not ready
    // if (!isAuthCheckDone) {
    //     // console.log("loader");
    //     // console.log(user);

    //     return (
    //         <div role="status">
    //             <svg
    //                 aria-hidden="true"
    //                 className="w-24 h-24 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
    //                 viewBox="0 0 100 101"
    //                 fill="none"
    //                 xmlns="http://www.w3.org/2000/svg"
    //             >
    //                 <path
    //                     d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
    //                     fill="currentColor"
    //                 />
    //                 <path
    //                     d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
    //                     fill="currentFill"
    //                 />
    //             </svg>
    //             <span className="sr-only">Loading...</span>
    //         </div>
    //     );
    // }

    if (!isAuthCheckDone) return null;

    // console.log(isAuthCheckDone);

    // console.log("auth provider exit -", Date.now().toLocaleString());

    // console.log({ isUserAuthenticated, user });

    return (
        <AuthContext.Provider
            value={{
                isUserAuthenticated,
                user,
                isloading,
                isError,
                error,
                logout,
                login,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;

/*
initial render -> if condtional render not present -> app render with user null (initial render of app)
                  if condtional render present -> app render with loader

render triggered
by fetching result ->   if condtional render not present -> app still render with user null (no re-render)
                        if condtional render present -> app render with user null

render triggered
by useEffect -> if condtional render not present -> app render with user null/value (no re-render)
                if condtional render present -> app render with null/user
*/
