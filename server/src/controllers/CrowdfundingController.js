const Crowdfunding = require("../models/Crowdfunding");
exports.createCrowdfunding = async (req, res) => {
  try {
    console.log(req.body);
    const { title, description, totalAmount } = req.body;
    await Crowdfunding.create({ title, description, totalAmount });
    res.status(201).json({
      status: "success",
      data: {}
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

exports.showAllPosts = async (req, res) => {
  try {
    const allPosts = await Crowdfunding.find({});
    res.status(201).json({
      status: "success",
      data: {
        allPosts
      }
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

exports.showParticularOrgnaisationPost = async (req, res) => {
  try {
    const posts = await Crowdfunding.findById(req.params.orgId);
    res.status(201).json({
      status: "success",
      data: {
        posts
      }
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
