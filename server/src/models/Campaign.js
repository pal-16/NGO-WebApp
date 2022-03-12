const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CampaignSchema = new Schema(
  {
    orgId: {
      type: Schema.Types.ObjectId,
      ref: "organization",
      required: true
    },
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
      type: Date,
      required: false
    },
    date: {
      type: Date,
      required: false
    }
  },
  { timestamps: true }
);

const Campaign = mongoose.model("campaign", CampaignSchema);
module.exports = Campaign;
