const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AssistanceRequestSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user"
    },
    assignedUser: {
      type: Schema.Types.ObjectId,
      ref: "user"
    },
    currentStatus: {
      type: String,
      required: true,
      enum: ["Pending", "Assigned", "Completed"],
      default: "Pending"
    },
    userlocation: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ['Point'], // 'location.type' must be 'Point'
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },
    assignedUserlocation: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ['Point'], // 'location.type' must be 'Point'
      },
      coordinates: {
        type: [Number],
      }
    }
  },
  { timestamps: true }
);
AssistanceRequestSchema.index({ "userlocation": "2dsphere" });
AssistanceRequestSchema.index({ "assignedUserlocation": "2dsphere" });

const AssistanceRequest = mongoose.model("assistanceRequest", AssistanceRequestSchema);
module.exports = AssistanceRequest;