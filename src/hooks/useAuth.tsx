import apiClient from "../api/ApiClient";

const useAuth = () => {
    async function login(email: string, password: string) {
        try {
            const response = await apiClient.post("/login", {
                email,
                password,
            });

            const data = response.data;
            if (data.error) {
                return data.error;
            }
            localStorage.setItem('token', data.token);
            return data;
        }
        catch (err) {
            return err;
        }
    }   

    return {
        login
    }
}

export default useAuth;