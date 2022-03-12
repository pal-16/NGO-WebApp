const UserController = require("./controllers/UserController");
const OrganizationController = require("./controllers/OrganizationController");
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
  app.post("/api/user/chatbot", UserController.chatbot);
};
