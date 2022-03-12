const UserController = require("./controllers/UserController");
const OrganizationController = require("./controllers/OrganizationController");
const CrowdfundingController = require("./controllers/CrowdfundingController");
const uploader = require("./utilities/uploader");
const auth = require("./middleware/auth");

module.exports = (app) => {
  app.get("/api/check", (req, res) => {
    res.json("Connected");
  });

  app.post("/api/user/register", UserController.registerUser);
  app.post("/api/user/login", UserController.loginUser);
  app.post("/api/org/register", OrganizationController.registerOrganization);
  app.post("/api/org/login", OrganizationController.loginOrganization);

  app.route("/api/user/assistance")
    .post(auth.loginRequired, UserController.createAssistanceRequest)
    .get(auth.loginRequired, UserController.getAssistanceRequest);

  app.route("/api/user/assistance/accept")
    .post(auth.loginRequired, UserController.acceptAssistanceRequest);
  app.post("/api/user/chatbot", UserController.chatbot);

  app.route("/api/crowdfunding/create")
  .post(auth.loginRequired, CrowdfundingController.createCrowdfunding);
};
