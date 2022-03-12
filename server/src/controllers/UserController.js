const User = require("../models/User");
const Organization = require("../models/Organization");
const axios = require("axios");
const auth = require("../utilities/auth");
const { WebhookClient } = require("dialogflow-fulfillment");

//Register user
exports.registerUser = async (req, res) => {
  try {
    const user = await User.findOne({
      $or: [{ userID: req.body.userID }, { email: req.body.email }]
    });

    if (user) {
      return res.status(400).json({
        error: "user with this ID or email already exists"
      });
    }
    console.log(user);
    const newuser = await user.create({
      ...req.body
    });
    const token = auth.signToken(newuser._id);

    res.status(201).json({
      status: "success",
      token,
      data: {
        userID: newuser._id
      }
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

//user Login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({ error: "Incorrect email or password" });
    }

    const token = auth.signToken(user._id);
    res.status(200).json({
      status: "success",
      token,
      data: {
        userID: user._id
      }
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

exports.chatbot = async (req, res) => {
  try {
    const agent = new WebhookClient({ request: req, response: res });
    // async function getNearOrganization(agent){

    // }
    const location =
      agent.context.get("location").parameters["location.original"];
    console.log(location);
    try {
      var payloadData = {
        richContent: [
          [
            {
              type: "info",
              title: `You might be suffering from .We have found the following doctors nearest to your location best treating the disease you are suffering from `
            }
          ]
        ]
      };
    } catch (err) {
      console.log(err);
      var payloadData = {
        richContent: [
          [
            {
              type: "info",
              title: `I couldn 't understand you.'
												`
            }
          ]
        ]
      };
    }
    agent.add(
      new dfff.Payload(agent.UNSPECIFIED, payloadData, {
        sendAsMessage: true,
        rawPayload: true
      })
    );

    function defaultFallback(agent) {
      agent.add(
        "Sorry! I am unable to understand this at the moment. I am still learning humans. You can pick any of the service that might help me."
      );
    }
    var intentMap = new Map();
    intentMap.set("get_current_location", getDoctorDetails);
    agent.handleRequest(intentMap);

    const token = auth.signToken(user._id);
    res.status(200).json({
      status: "success",
      token,
      data: {}
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
