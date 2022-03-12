const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const user = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: validator.isEmail
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  crowdfunding: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "crowfunding"
      }
    ],
    default: []
  },
  campaign: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "campaign"
      }
    ],
    default: []
  },
  transaction: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "transaction"
      }
    ],
    default: []
  },
  assistanceRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "assistanceRequest"
    }
  ]
});

user.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

user.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("user", user);

module.exports = User;
