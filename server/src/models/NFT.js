const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NFTSchema = new Schema(
  {
    imageURL: {
      type: String
    },
    amount: {
      type: Number
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "organization"
    },
    user: {
      type: mongoose.Schema.Types.ObjectId
    }
  },
  { timestamps: true }
);

const NFT = mongoose.model("nft", NFTSchema);
module.exports = NFT;
