import apiClient from "../api/ApiClient";
import { userAtom } from "../store/user";
import { useAtom } from "jotai";

const useAuth = () => {

    const [userLogin, setUserLogin] = useAtom(userAtom);

    const registerIncompleteCandidate = async (data: any) => {
        try {
            const response: any = await apiClient.post("/auth/register-incomplete-candidate", data);

            const responseData = response.data;

            return {
                response: responseData,
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

            setUserLogin({
                ...userLogin,
                names: responseData.name,
                email: responseData.email,
            })

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
        loginCandidate
    }
}

export default useAuth;