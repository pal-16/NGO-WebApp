const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const org = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
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
    password: {
      type: String,
      required: true,
      select: false
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
    session: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "session"
        }
      ],
      default: []
    },
    type: {
      type: String,
      enum: ["NGO", "Orphange", "Old Age Home"],
      default: "NGO",
      required: true
    },
    address: {
      type: String,
      required: true
    },
    location: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        default: "Point",
        required: false
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },
    transaction: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "transaction"
        }
      ],
      default: []
    }
  },
  { timestamps: true }
);

org.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

org.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};


org.index({ location: "2dsphere" });
const Organization = mongoose.model("organization", org);

module.exports = Organization;
