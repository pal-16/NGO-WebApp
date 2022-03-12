import axios from "./axios.js";

const AuthApi = {
	signIn: ({ email, password, userType }) => {
		return axios.post(`/${userType}/login`, { email, password });
	},
	signUp: ({ email, password, name, address, userType }) => {
		return axios.post(`/${userType}/register`, {
			email,
			password,
			userType,
			address,
			name,
		});
	},
};

export default AuthApi;
