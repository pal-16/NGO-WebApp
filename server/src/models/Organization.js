const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrganizationSchema = new Schema(
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
        enum: ["Point"], // 'location.type' must be 'Point'
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    }
  },
  { timestamps: true }
);

const Organization = mongoose.model("organization", OrganizationSchema);
module.exports = Organization;
