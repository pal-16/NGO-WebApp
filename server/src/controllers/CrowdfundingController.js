const Crowdfunding = require("../models/Crowdfunding");
exports.createCrowdfunding = async (req, res) => {
    try {
     console.log(req.body);
      const {title, description, totalAmount } = req.body;
      await Crowdfunding.create({title, description, totalAmount}); 
      res.status(201).json({
        status: "success",
        data: {
        }
      });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  };