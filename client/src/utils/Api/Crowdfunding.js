import axios from "./axios.js";

const CrowdfundingApi = {
	create: ({title,description, totalAmount }) => {
		return axios.post(`/crowdfunding/create`, {title,description,totalAmount});
    }
};

export default CrowdfundingApi;
