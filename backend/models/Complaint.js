const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema(
  {
    police_station: String,
    gd_case_no: String,
    complainant_name: String,
    relation: String,
    profession: String,
    present_address: String,
    total_amount: Number,
    amount_from: String,
    amount_to: String,
    fraud_description: String,
    banks: [
      {
        bank_name: String,
        account_no: String,
        ifsc: String,
        transactions: [
          {
            amount: Number,
            date: String,
            time: String,
            refNo: String,
          },
        ],
      },
    ],
    files: {
      aadhar: String,
      gd_copy: String,
      bank_statement: String,
      card_copy: String,
      other_docs: [String],
    },
    isRead:{
      type:Boolean,
      default:false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Complaint", ComplaintSchema);
