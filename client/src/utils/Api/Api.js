import TokenApi from "./TokenApi.js";
import AuthApi from "./Auth.js";
import { toast } from "react-toastify";

const Api = {
  auth: AuthApi,
  token: TokenApi
};

export const responseErrorHandler = (error, toastElement) => {
  if (!error.response && !error.message) {
    toast.update(toastElement, {
      render: "Network Error",
      type: "error",
      isLoading: false,
      autoClose: true,
    });
  } else {
    console.log(error);
    toast.update(toastElement, {
      render:
        error?.response?.data?.error?.message ? error.response.data?.error?.message :
          error?.response?.data?.error ? error.response.data?.error :
            error?.message ? error.message
              : "Some Error Occured",
      type: "error",
      isLoading: false,
      autoClose: true,
    });
  }
};

export default Api;
