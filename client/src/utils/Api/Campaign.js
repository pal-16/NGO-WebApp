import axios from "./axios.js";

const AuthApi = {
	create: ({ orgId, title, description, totalAmount }) => {
		return axios.post(`/campaign/create`, {
			orgId,
			title,
			description,
			totalAmount,
		});
	},
	getAllPosts: () => {
		return axios.get(`/crowdfunding/getAllCampaigns`);
	},
	getParticular: ({ orgId }) => {
		return axios.get(`/org/campaign/${orgId}`);
	},
};

export default AuthApi;
