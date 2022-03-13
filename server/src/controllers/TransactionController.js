const Crowdfunding = require("../models/Crowdfunding");
const Organization = require("../models/Organization");
const Transaction = require("../models/Transaction");
const User = require("../models/User");

exports.showAllTransactions = async (req, res) => {
  try {
    const transactions = Transaction.find({ orgId: req.params.orgId });
    console.log(transactions);
    res.status(201).json({
      status: "success",
      data: {
        transactions
      }
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
