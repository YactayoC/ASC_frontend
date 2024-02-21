import apiClient from "../../api/ApiClient";

const useVerificationEmail = () => {
  const sendVerificationEmail = async (data: any) => {
    try {
      const response: any = await apiClient.post(
        "/auth/candidate/register-incomplete",
        data
      );

      const responseData = response.data;

      return {
        response: responseData,
        status: response.status,
        ok: true,
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  
  const sendVerificationEmailCompany = async (data: any) => {
    try {
      const response: any = await apiClient.post(
        "/auth/company/register-incomplete",
        data
      );

      const responseData = response.data;

      return {
        response: responseData,
        status: response.status,
        ok: true,
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const verifyCodeEmail = async (data: any) => {
    try {
      const response: any = await apiClient.post(
        "/auth/verify-email",
        data
      );

      const responseData = response.data;

      return {
        response: responseData,
        status: response.status,
        ok: true,
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const verifyCodeEmailCompany = async (data: any) => {
    try {
      const response: any = await apiClient.post(
        "/auth/verify-email-company",
        data
      );

      const responseData = response.data;

      return {
        response: responseData,
        status: response.status,
        ok: true,
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  return {
    sendVerificationEmail,
    verifyCodeEmail,
    sendVerificationEmailCompany,
    verifyCodeEmailCompany
  };
};

export default useVerificationEmail;
