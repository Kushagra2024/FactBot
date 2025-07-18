import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/factbot/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

api.interceptors.response.use(
    (res) => res,
    async (error) => {
        if (
            error?.response?.status === 401 &&
            error?.response?.data?.errors[0] === "token_expired" &&
            !error.config._retry
        ) {
            error.config._retry = true;
            try {
                await refreshToken();
                return api(error.config);
            } catch (refreshErr) {
                return Promise.reject(refreshErr);
            }
        }
        return Promise.reject(error);
    }
);

// --------------------------- FUNCTION DECLARATIONS -----------------------------------
async function getuser() {
    try {
        const response = await api.get("/user/me");
        return response?.data?.data[0];
    } catch (error) {
        throw error?.response?.data?.errors;
    }
}

async function refreshToken() {
    try {
        const response = await api.get("/user/refresh-access-token");
        return response?.data?.data;
    } catch (error) {
        throw error?.response?.data?.errors;
    }
}

async function loginUser(data) {
    try {
        const response = await api.post("/user/login", data);
        return response?.data?.data[0];
    } catch (error) {
        throw error?.response?.data?.errors;
    }
}

async function logoutUser() {
    try {
        const response = await api.post("/user/logout");
        return response?.data?.data;
    } catch (error) {
        throw error?.response?.data?.errors;
    }
}

async function getCurrentSession() {
    let data = null;
    let error = null;
    try {
        const response = await api.get("/chats");
        data = response.data;
    } catch (err) {
        error = err.message;
    }

    return [data, error];
}

export { getCurrentSession, getuser, logoutUser, loginUser };
