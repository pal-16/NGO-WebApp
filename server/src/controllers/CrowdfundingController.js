const Crowdfunding = require("../models/Crowdfunding");
const Organization = require("../models/Organization");
const Transaction = require("../models/Transaction");
const User = require("../models/User");

const Web3 = require('web3');
const artifacts = require('../build/contracts/LendHandNFT.json');
let web3;

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
}

exports.createCrowdfunding = async (req, res) => {
  try {
    console.log(req.body);
    const { orgId, title, description, totalAmount } = req.body;
    const crowdfundingPost = await Crowdfunding.create({
      orgId,
      title,
      description,
      totalAmount,
      imageUrl
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
   
    const { amount, postId, orgId, userId, paymentId } = req.body;
    let post = await Crowdfunding.findById(postId);
   
 
    post.currentAmount=post.currentAmount+amount;
    if(post.currentAmount>=post.totalAmount){
      post.status="Completed";
    }
     
    await post.save();
    const transaction = await Transaction.create({ amount, postId, orgId, userId, paymentId });
    const LendHand = new web3.eth.Contract(artifacts.abi, "0x722ef55088838df5BE39F74fa143C9f7FDC9daC9");
    const user = await User.findByIdAndUpdate(userId);
    LendHand.methods.awardItem(user.ethereumAddress, "").call();

    await Organization.findByIdAndUpdate(orgId, {
      $push: { transaction: transaction }
    });
    await User.findByIdAndUpdate(userId, {
      $push: { transaction: transaction }
    });
    await Crowdfunding.findByIdAndUpdate(postId, {
      $push: { transaction: transaction }
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