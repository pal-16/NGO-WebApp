const User = require("../models/User");
const AssistanceRequest = require("../models/AssistanceRequest");
const Organization = require("../models/Organization");
const axios = require("axios");
const auth = require("../utilities/auth");
const dfff = require("dialogflow-fulfillment");
const GeocoderArcGIS = require("geocoder-arcgis");

const geocoder = new GeocoderArcGIS();

//Register user
exports.registerUser = async (req, res) => {
  try {
    const user = await User.findOne({
      $or: [{ email: req.body.email }]
    });
    console.log(user, [{ userID: req.body.userID }, { email: req.body.email }]);
    if (user) {
      return res.status(400).json({
        error: "user with this ID or email already exists"
      });
    }
    const { name, email, address, password, status } = req.body;

    let loc = [];

    const result = await geocoder.findAddressCandidates(address, {});
    loc.push(result.candidates[0].location.x);
    loc.push(result.candidates[0].location.y);
    let location = { type: "Point", coordinates: loc };

    const newuser = await User.create({
      name,
      email,
      address,
      password,
      status,
      location
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

//create user assistance request
exports.createAssistanceRequest = async (req, res) => {
  try {
    const assistanceRequest = await AssistanceRequest.create({
      ...req.body,
      user: req.userId
    });
    res.status(200).json({
      status: "success",
      data: {
        assistanceRequest
      }
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

//get user current assistance request
exports.getAssistanceRequest = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (user.status == "disability") {
      const assistanceRequest = await AssistanceRequest.findOne({
        user: user._id,
        currentStatus: {
          $in: ["Assigned", "Pending"]
        }
      });
      res.status(200).json({
        status: "success",
        assistanceRequest,
        user
      });
    } else {
      const assistanceRequest = await AssistanceRequest.findOne({
        assignedUser: req.userId,
        currentStatus: "Assigned"
      });
      console.log("Not disbaled", assistanceRequest);
      res.status(200).json({
        status: "success",
        assistanceRequest,
        user
      });
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

//user assistance request
exports.acceptAssistanceRequest = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    console.log({ latitude, longitude });
    const assistanceRequest = await AssistanceRequest.findOne({
      currentStatus: "Pending",
      userlocation:
      {
        $near:
        {
          $geometry:
          {
            type: "Point",
            coordinates: [latitude, longitude]
          },
          $maxDistance: 100
        }
      }
    });
    if (!assistanceRequest) {
      return res.status(404).json({
        error:
          "No assistance required in your area currently, please try again later"
      });
    }
    assistanceRequest.currentStatus = "Assigned";
    assistanceRequest.assignedUser = req.userId;
    assistanceRequest.assignedUserlocation = {
      type: "Point",
      coordinates: [latitude, longitude]
    };
    await assistanceRequest.save();
    res.status(200).json({
      status: "success",
      assistanceRequest
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

exports.updateLocation = async (req, res) => {
  try {
    const assistanceRequest = await AssistanceRequest.findOne({
      assignedUser: req.userId,
      currentStatus: "Assigned"
    });
    assistanceRequest.assignedUserlocation = {
      type: "Point",
      coordinates: [req.body.latitude, req.body.longitude]
    }
    await assistanceRequest.save();
    res.status(200).json({
      status: "success",
      assistanceRequest
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}

exports.completeAssistanceRequest = async (req, res) => {
  try {
    const assistanceRequest = await AssistanceRequest.findOne({
      assignedUser: req.userId,
      currentStatus: "Assigned"
    });
    assistanceRequest.currentStatus = "Completed";
    await assistanceRequest.save();
    res.status(200).json({
      status: "success",
      assistanceRequest
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

exports.chatbot = async (req, res) => {
  try {
    const agent = new dfff.WebhookClient({ request: req, response: res });
    const location = await agent.context.get("location").parameters[
      "location.original"
    ];
    console.log(location);
    const range = await agent.context.get("range").parameters["range.original"];

    const result = await geocoder.findAddressCandidates(location, {});
    console.log(result);
    var payloadData = {};
    async function getNearOrganization(agent) {
      try {
        const orgs = await Organization.find({
          location: {
            $near: {
              $geometry: {
                type: "Point",
                coordinates: [
                  result.candidates[0].location.x,
                  result.candidates[0].location.y
                ]
              },
              $maxDistance: range * 1000
            }
          }
        });
        orgs.length == 0
          ? (payloadData = {
            richContent: [
              [
                {
                  type: "info",
                  title: `No NGO's found within ${range}kms`
                }
              ]
            ]
          })
          : (payloadData = {
            richContent: [
              orgs.map((organization) => {
                return {
                  type: "list",
                  title: organization.name,
                  subtitle: organization.email,
                  event: {
                    name: "",
                    languageCode: "",
                    parameters: {}
                  }
                };
              })
            ]
          });
        console.log(orgs);
      } catch (err) {
        console.log(err);
        payloadData = {
          richContent: [
            [
              {
                type: "info",
                title: `I couldn't understand you.'`
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
    }

    function defaultFallback(agent) {
      agent.add(
        "Sorry! I am unable to understand this at the moment. I am still learning humans. You can pick any of the service that might help me."
      );
    }
    var intentMap = new Map();
    intentMap.set("get_current_location", getNearOrganization);
    agent.handleRequest(intentMap);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e.message });
  }
};
