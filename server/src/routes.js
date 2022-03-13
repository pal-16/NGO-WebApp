const UserController = require("./controllers/UserController");
const OrganizationController = require("./controllers/OrganizationController");
const CrowdfundingController = require("./controllers/CrowdfundingController");
const CampaignController = require("./controllers/CampaignController");
const TransactionController = require("./controllers/TransactionController");
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

  app
    .route("/api/user/assistance")
    .post(auth.loginRequired, UserController.createAssistanceRequest)
    .get(auth.loginRequired, UserController.getAssistanceRequest);

  app
    .route("/api/user/assistance/accept")
    .post(auth.loginRequired, UserController.acceptAssistanceRequest);

  app
    .route("/api/user/assistance/complete")
    .post(auth.loginRequired, UserController.completeAssistanceRequest);

  app
    .route("/api/user/assistance/update")
    .post(auth.loginRequired, UserController.updateLocation);

  app.post("/api/user/chatbot", UserController.chatbot);

  app
    .route("/api/crowdfunding/create")
    .post(auth.loginRequired, CrowdfundingController.createCrowdfunding);

  app
    .route("/api/user/donate")
    .post(auth.loginRequired, CrowdfundingController.makeTransaction);
  app.get("/api/crowdfunding/getAllPosts", CrowdfundingController.showAllPosts);
  app
    .route("/api/org/crowdfunding/:orgId")
    .get(
      auth.loginRequired,
      CrowdfundingController.showParticularOrgnaisationPost
    );

  app.get("/api/nft/:id", CrowdfundingController.getNFT);
  //add org in url
  app
    .route("/api/campaign/create")
    .post(auth.loginRequired, CampaignController.createCampaign);

  app.get("/api/campaign/getAllCampaigns", CampaignController.showAllCampaigns);
  app.get(
    "/api/transactions/:orgId",
    TransactionController.showAllTransactions
  );
  app
    .route("/api/org/campaigns/:orgId")
    .get(auth.loginRequired, CampaignController.showParticularCampaign);
};
