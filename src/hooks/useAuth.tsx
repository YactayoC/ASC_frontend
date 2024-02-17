import apiClient from "../api/ApiClient";

const useAuth = () => {

    const registerIncompleteCandidate = async (data: any) => {
        try {
            const response: any = await apiClient.post("/auth/register-incomplete-candidate", data);

            const responseData = response.data;

            return {
                response: JSON.stringify(responseData),
                status: response.status,
                ok: true
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const loginCandidate = async (data: any) => {
        try {
            const response: any = await apiClient.post("/auth/login/candidate", data);

            const responseData = response.data;

            return {
                response: responseData,
                status: response.status,
                ok: true
            };
        }
        catch (err) {
            console.log(err);
        }
    }

    const loginCompany = async (data: any) => {
        try {
            const response: any = await apiClient.post("/auth/login/company", data);

            const responseData = response.data;

            return {
                response: responseData,
                status: response.status,
                ok: true
            };
        }
        catch (err) {
            console.log(err);
        }
    }

    return {
        registerIncompleteCandidate,
        loginCandidate,
        loginCompany
    }
}

export default useAuth;