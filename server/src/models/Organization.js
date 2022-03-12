const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrganizationSchema = new Schema(
  {

    name: {
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
      enum: [
        "NGO",
        "Orphange",
        "Old Age Home"
      ],
      default: "NGO",
      required: true
    },
    // LOCATION
  },
  { timestamps: true }
);

const Organization = mongoose.model("organization", OrganizationSchema);
module.exports = Application;
