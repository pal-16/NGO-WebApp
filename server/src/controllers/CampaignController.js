const Campaign = require("../models/Campaign");
const Organization = require("../models/Organization");

exports.createCampaign = async (req, res) => {
  try {
    console.log(req.body);
    const { orgId, name, description, noOfVolunteers, time, date } = req.body;
    const campaign = await Campaign.create({
      orgId,
      name,
      description,
      noOfVolunteers,
      time,
      date
    });
    await Organization.findByIdAndUpdate(orgId, {
      $push: { campaign: campaign }
    });
    res.status(201).json({
      status: "success",
      data: {}
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

exports.showAllCampaigns = async (req, res) => {
  try {
    const allCampaigns = await Campaign.find({});
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
