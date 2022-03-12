import axios from "./axios.js";

const AuthApi = {
  signIn: ({ email, password, userType }) => {
    return axios.post(`/${userType}/login`, { email, password });
  },
  signUp: ({ email, password, userType }) => {
    return axios.post(`/${userType}/regsiter`, {
      email,
      password,
      userType
    });
  },
};

export default AuthApi;
