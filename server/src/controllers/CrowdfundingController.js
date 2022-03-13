const Crowdfunding = require("../models/Crowdfunding");
const Organization = require("../models/Organization");
const Transaction = require("../models/Transaction");
const User = require("../models/User");
const NFT = require("../models/NFT");

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "pblvjti@gmail.com",
    pass: process.env.GMAIL_PASS
  }
});

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

let arr_ = [
  "https://res.cloudinary.com/djmchgw4a/image/upload/v1647116299/kids_drawing_images/23_yq0lzo.jpg",
  "https://res.cloudinary.com/djmchgw4a/image/upload/v1647116299/kids_drawing_images/28_kuuctq.jpg",
  "https://res.cloudinary.com/djmchgw4a/image/upload/v1647116299/kids_drawing_images/26_zagqrf.jpg",
  "https://res.cloudinary.com/djmchgw4a/image/upload/v1647116299/kids_drawing_images/25_kjxi9j.jpg",
  "https://res.cloudinary.com/djmchgw4a/image/upload/v1647116299/kids_drawing_images/17_uwawgu.jpg",
  "https://res.cloudinary.com/djmchgw4a/image/upload/v1647116299/kids_drawing_images/27_szkr2w.jpg",
  "https://res.cloudinary.com/djmchgw4a/image/upload/v1647116299/kids_drawing_images/24_oyejys.jpg",
  "https://res.cloudinary.com/djmchgw4a/image/upload/v1647116299/kids_drawing_images/21_yifybx.png",
  "https://res.cloudinary.com/djmchgw4a/image/upload/v1647116298/kids_drawing_images/19_i6csfa.png",
  "https://res.cloudinary.com/djmchgw4a/image/upload/v1647116298/kids_drawing_images/18_o3z66f.jpg",
  "https://res.cloudinary.com/djmchgw4a/image/upload/v1647116298/kids_drawing_images/20_eob4kz.jpg",
  "https://res.cloudinary.com/djmchgw4a/image/upload/v1647116298/kids_drawing_images/16_haxtuw.jpg",
  "https://res.cloudinary.com/djmchgw4a/image/upload/v1647115197/kids_drawing_images/5_iyjt13.jpg",
  "https://res.cloudinary.com/djmchgw4a/image/upload/v1647115196/kids_drawing_images/15_mesgi4.jpg",
  "https://res.cloudinary.com/djmchgw4a/image/upload/v1647115196/kids_drawing_images/14_gvlt7e.jpg",
  "https://res.cloudinary.com/djmchgw4a/image/upload/v1647115196/kids_drawing_images/7_kpwmxq.jpg",
  "https://res.cloudinary.com/djmchgw4a/image/upload/v1647115196/kids_drawing_images/6_eacaxb.jpg",
  "https://res.cloudinary.com/djmchgw4a/image/upload/v1647115196/kids_drawing_images/4_t9d9qa.jpg",
  "https://res.cloudinary.com/djmchgw4a/image/upload/v1647115196/kids_drawing_images/2_u5iavc.jpg",
  "https://res.cloudinary.com/djmchgw4a/image/upload/v1647115195/kids_drawing_images/9_ncovff.jpg",
  "https://res.cloudinary.com/djmchgw4a/image/upload/v1647115195/kids_drawing_images/3_inucur.jpg",
  "https://res.cloudinary.com/djmchgw4a/image/upload/v1647115195/kids_drawing_images/11_hrftr8.jpg",
  "https://res.cloudinary.com/djmchgw4a/image/upload/v1647115195/kids_drawing_images/13_y4ofwv.jpg",
  "https://res.cloudinary.com/djmchgw4a/image/upload/v1647115194/kids_drawing_images/12_ugthij.jpg",
  "https://res.cloudinary.com/djmchgw4a/image/upload/v1647115194/kids_drawing_images/1_ner7se.jpg",
  "https://res.cloudinary.com/djmchgw4a/image/upload/v1647115194/kids_drawing_images/10_tinz5v.jpg",
  "https://res.cloudinary.com/djmchgw4a/image/upload/v1647115193/kids_drawing_images/8_q7smrf.jpg",
  "https://res.cloudinary.com/djmchgw4a/image/upload/v1647116074/kids_drawing_images/handmade_images/r_ynphxs.jpg",
  "https://res.cloudinary.com/djmchgw4a/image/upload/v1647116074/kids_drawing_images/handmade_images/u_d7ez1l.jpg",
  "https://res.cloudinary.com/djmchgw4a/image/upload/v1647116074/kids_drawing_images/handmade_images/cc_kveqeo.jpg",
  "https://res.cloudinary.com/djmchgw4a/image/upload/v1647116074/kids_drawing_images/handmade_images/s_ckzprc.jpg",
  "https://res.cloudinary.com/djmchgw4a/image/upload/v1647116074/kids_drawing_images/handmade_images/t_nc055x.jpg",
  "https://res.cloudinary.com/djmchgw4a/image/upload/v1647116074/kids_drawing_images/handmade_images/dd_psujan.jpg",
  "https://res.cloudinary.com/djmchgw4a/image/upload/v1647116074/kids_drawing_images/handmade_images/bb_kwljht.jpg",
  "https://res.cloudinary.com/djmchgw4a/image/upload/v1647116073/kids_drawing_images/handmade_images/aa_tx3g5q.jpg",
];

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

    const nft = await NFT.create({
      user: userId,
      organization: orgId,
      amount: transaction.amount,
      imageURL: arr_[0]
    })

    var mailOptions = {
      from: "SpreadASmile",
      to: user.email,
      subject: "Yayy you have won a free NFT",
      text: `You have won a free NFT! http://localhost:3000/nft/${nft._id}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

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

exports.getNFT = async (req, res) => {
  try {
    const nft = await NFT.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        nft
      }
    });
  } catch (e) {
    console.log(e.message)
    return res.status(500).json({ error: e.message });
  }
}