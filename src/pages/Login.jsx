import { useEffect, useState } from "react";
import { useAuth } from "../hooks";
import { useNavigate } from "react-router-dom";

function Login() {
    const [loginFormData, setLoginFormData] = useState({
        email: "",
        password: "",
    });

    const { login, isloading, isError, error, isUserAuthenticated } = useAuth();

    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;

        setLoginFormData((prev) => {
            return { ...prev, [name]: value };
        });
    }

    function handleLoginFormSubmission(e) {
        e.preventDefault();
        login(loginFormData);
    }

    useEffect(() => {
        if (isUserAuthenticated) {
            // console.log("redirecting user to home page");r

            navigate("/", {
                replace: true,
            });
        }
    }, [isUserAuthenticated]);

    // console.log(
    //     "into auth login page - ",
    //     { isUserAuthenticated },
    //     "-",
    //     Date.now().toLocaleString()
    // );

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    alt="Your Company"
                    src="public\icons\chat_icon.png"
                    className="mx-auto h-10 w-auto"
                />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    Sign in to Chatbot account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form
                    onSubmit={handleLoginFormSubmission}
                    className="space-y-6"
                >
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm/6 font-medium text-gray-900"
                        >
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                value={loginFormData?.email}
                                onChange={handleChange}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                Password
                            </label>
                            <div className="text-sm">
                                <a
                                    href="#"
                                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                                >
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                autoComplete="current-password"
                                value={loginFormData?.password}
                                onChange={handleChange}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        {isError && (
                            <h1 className="block text-center text-sm/6 font-medium text-red-500">
                                {error[0]}
                            </h1>
                        )}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className={`flex w-full justify-center rounded-md  px-3 py-1.5 text-sm/6 font-semibold  shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2  ${
                                isloading
                                    ? "text-gray-300 bg-indigo-400"
                                    : "text-white bg-indigo-600 hover:bg-indigo-500 cursor-pointer focus-visible:outline-indigo-600"
                            }`}
                            disabled={isloading}
                        >
                            {isloading ? "Logging in" : "Login"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
