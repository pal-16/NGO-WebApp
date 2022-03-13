const Campaign = require("../models/Campaign");
const Organization = require("../models/Organization");
const User = require("../models/User");
const nodemailer = require("nodemailer");
const GeocoderArcGIS = require("geocoder-arcgis");

const geocoder = new GeocoderArcGIS();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "pblvjti@gmail.com",
    pass: process.env.GMAIL_PASS
  }
});

exports.createCampaign = async (req, res) => {
  try {
    console.log(req.body);
    const {
      orgId,
      name,
      description,
      noOfVolunteers,
      time,
      date,
      address,
      imageUrl
    } = req.body;

    let loc = [];

    const result = await geocoder.findAddressCandidates(address, {});

    loc.push(result.candidates[0].location.x);
    loc.push(result.candidates[0].location.y);
    let location = { type: "Point", coordinates: loc };

    const campaign = await Campaign.create({
      orgId,
      name,
      description,
      noOfVolunteers,
      time,
      date,
      location,
      address,
      imageUrl
    });
    await Organization.findByIdAndUpdate(orgId, {
      $push: { campaign: campaign }
    });
    const filteredUsers = await User.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [
              result.candidates[0].location.x,
              result.candidates[0].location.y
            ]
          },
          $maxDistance: 50000
        }
      }
    });
    console.log(filteredUsers);
    const emails = await filteredUsers.map((user) => {
      return user.email;
    });
    console.log(emails);

    await emails.map((email) => {
      var mailOptions = {
        from: "spreadasmile@gmail.com",
        to: email,
        subject: "Invitation to join the campaign",
        text: "Hello, Hope you are having a great day. We at SpreadASmile Organization request you to spare few minutes in knowing about the campaign that we are conducting and if you would be interested to volunteer via your skills. Your few hours can donate huge amount of smile and confidence to the community"
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    });

    res.status(201).json({
      status: "success",
      data: {}
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e.message });
  }
};

exports.showAllCampaigns = async (req, res) => {
  try {
    const allCampaigns = await Campaign.find({});
    console.log(allCampaigns, "allCampaigns");
    res.status(201).json({
      status: "success",
      data: {
        allCampaigns
      }
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

exports.showParticularCampaign = async (req, res) => {
  try {
    const campaigns = await Organization.findById(req.params.orgId).populate(
      "campaign"
    );
    console.log(campaigns);
    res.status(201).json({
      status: "success",
      data: {
        campaigns
      }
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
