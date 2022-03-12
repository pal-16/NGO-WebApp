const Crowdfunding = require("../models/Crowdfunding");
const Organization = require("../models/Organization");
const Transaction = require("../models/Transaction");
const User = require("../models/User");

exports.createCrowdfunding = async (req, res) => {
  try {
    console.log(req.body);
    const { orgId, title, description, totalAmount } = req.body;
    const crowdfundingPost = await Crowdfunding.create({
      orgId,
      title,
      description,
      totalAmount
    });
    await Organization.findByIdAndUpdate(orgId, {
      $push: { crowdfunding: crowdfundingPost }
    });
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

  exports.makeTransaction = async (req, res) => {
    try {
      console.log("====================");
console.log(req.body);

      const {amount,postId,orgId,userId,paymentId } = req.body;
      const transaction=await Transaction.create({amount,postId,orgId,userId,paymentId}); 
   
      await Organization.findByIdAndUpdate(orgId, {
        $push: { transaction:transaction }
    });
      await User.findByIdAndUpdate(userId, {
        $push: { transaction:transaction  }
    }); 
      await Crowdfunding.findByIdAndUpdate(postId, {
      $push: { transaction:transaction   }
  });
      res.status(201).json({
        status: "success",
        data: {
        }
      });
    } catch (e) {
      console.log(e.message)
      return res.status(500).json({ error: e.message });
    }
  };

