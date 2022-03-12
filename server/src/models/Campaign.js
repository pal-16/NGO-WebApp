const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CampaignSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    noOfVolunteers: {
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
    time: {
      type: DateTime,
      required: false
    },
    date: {
      type: Dat,
      required: false
    }
  },
  { timestamps: true }
);

const Campaign = mongoose.model("campaign", Campaignchema);
module.exports = Campaign;
