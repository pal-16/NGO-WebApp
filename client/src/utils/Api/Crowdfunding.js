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
	makeTransaction:({amount,postId,currOrgId,userId,paymentId})=>{
		return axios.post(`/user/donate/`+paymentId,{amount,postId,currOrgId,userId,paymentId})
	}
};

export default CrowdfundingApi;
