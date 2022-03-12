const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CrowdfundingSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    totalAmount: {
      type: Number,
      required: false
    },
    currentAmount: {
        type: Number,
        required: false
    },
    volunteers: {
        type: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
          }
        ],
        default: []
    },
    organization: {
        type: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "organization"
          }
        ],
        default: []
      }
  },
  { timestamps: true }
);

const Crowdfunding= mongoose.model("crowdfunding", CrowdfundingSchema);
module.exports = Crowdfunding;
