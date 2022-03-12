const User = require("../models/User");
const AssistanceRequest = require("../models/AssistanceRequest");
const axios = require("axios");
const auth = require("../utilities/auth");

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
    const newuser = await User.create({
      ...req.body,
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

    if (
      !user ||
      !(await user.correctPassword(password, user.password))
    ) {
      return res.status(401).json({ error: "Incorrect email or password" });
    }

    const token = auth.signToken(user._id);
    res.status(200).json({
      status: "success",
      token,
      data: {
        userID: user._id,
      }
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

//create user assistance request
exports.createAssistanceRequest = async (req, res) => {
  try {
    await AssistanceRequest.create({
      ...req.body,
      user: req.userId
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

//get user current assistance request
exports.getAssistanceRequest = async (req, res) => {
  try {
    const assistanceRequest = await AssistanceRequest.findOne({
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

//user assistance request
exports.acceptAssistanceRequest = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    const assistanceRequest = await AssistanceRequest.findOne({
      userLocation:
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
    })
    if (!assistanceRequest) {
      return res.status(404).json({
        error: "No assistance required in your area currently, please try again later"
      });
    }
    assistanceRequest.status = "Assigned";
    assistanceRequest.assignedUser = req.userId;
    assistanceRequest.assignedUserLocation = {
      type: "Point",
      coordinates: [latitude, longitude]
    }
    await assistanceRequest.save();
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