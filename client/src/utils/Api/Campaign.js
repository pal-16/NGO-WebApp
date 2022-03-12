import axios from "./axios.js";

const CampaignApi = {
	createCampaign: ({
		orgId,
		name,
		description,
		noOfVolunteers,
		date,
		time,
		address,
	}) => {
		console.log(`add=${address}`);
		return axios.post(`/campaign/create`, {
			orgId,
			name,
			description,
			noOfVolunteers,
			date,
			time,
			address,
		});
	},
	getAllCampaigns: () => {
		return axios.get(`/crowdfunding/getAllCampaigns`);
	},
	getParticularOrganizationCampaigns: ({ orgId }) => {
		return axios.get(`/org/campaign/${orgId}`);
	},
};

export default CampaignApi;
