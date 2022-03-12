const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema(
  {
   amount:{
     type:Number
   },
   postId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "crowfunding"    
   },
   userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user"    
    },
   orgId: {
    
          type: mongoose.Schema.Types.ObjectId,
          ref: "organization"
    },
    paymentId:{
      type:String
    }
  },
  { timestamps: true }
);
const Transaction = mongoose.model("transaction", TransactionSchema);

module.exports = Transaction;
