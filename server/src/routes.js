const UserController = require("./controllers/UserController");
const uploader = require("./utilities/uploader");
const auth = require("./middleware/auth");

module.exports = (app) => {
  app.get("/api/check", (req, res) => {
    res.json("Connected");
  });

   app.post("/api/user/register", UserController.registerUser);
  // app.post("/api/user/login", UserController.loginStudent);
  // app.post("/api/org/register", UserController.registerStudent);
  // app.post("/api/org/login", UserController.loginStudent);
 
};
