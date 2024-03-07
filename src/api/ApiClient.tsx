import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://asc-backend-w1g4.onrender.com/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export default apiClient;