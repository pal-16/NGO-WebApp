import axios from "./axios.js";

const AssistanceApi = {
  createAssistanceRequest: ({ latitude, longitude }) => {
    return axios.post(`/user/assistance`, {
      location: {
        type: "Point",
        coordinates: [latitude, longitude]
      }
    });
  },
  getAssistanceRequest: () => {
    return axios.get(`/user/assistance`);
  },
  acceptAssistanceRequest: ({ latitude, longitude }) => {
    return axios.post(`/user/assistance/accept`, {
      latitude,
      longitude
    });
  },
};

export default AssistanceApi;
