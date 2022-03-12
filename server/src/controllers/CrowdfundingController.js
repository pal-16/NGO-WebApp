const Crowdfunding = require("../models/Crowdfunding");
const Organization = require("../models/Organization");

exports.createCrowdfunding = async (req, res) => {
    try {
     console.log(req.body);
      const {orgId,title, description, totalAmount } = req.body;
      const crowdfundingPost=await Crowdfunding.create({orgId,title, description, totalAmount}); 
      await Organization.findByIdAndUpdate(orgId, {
        $push: { crowdfunding: crowdfundingPost }
    });
      res.status(201).json({
        status: "success",
        data: {
        }
      });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  };