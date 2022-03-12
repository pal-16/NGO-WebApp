import axios from "./axios.js";

const CrowdfundingApi = {
	create: ({orgId,title,description, totalAmount }) => {
		return axios.post(`/crowdfunding/create`, {orgId,title,description,totalAmount});
    },
	getAllPosts:()=>{
		return axios.get(`/crowdfunding/getAllPosts`);
	},
	getParticular:({orgId})=>{
		return axios.get(`/org/crowdfunding`+`${orgId}`);
	},


};

export default CrowdfundingApi;
