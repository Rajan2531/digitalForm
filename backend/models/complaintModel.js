


const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema(
  {
    complaint_id: {
      type: String,
      unique: true,
    },

    // Basic Details
    police_station: String,
    gd_case_no: String,
    complainant_name: String,
    relation: String,
    profession: String,
    present_address: String,
    phone_no: String,
    email_id: String,

    // New fields
    dob: String,
    age: Number,
    sex: String,

    fraudster_phone: String, // ✅ NEW

    // Fraud Summary
    total_amount: Number,
    amount_from: String,
    amount_to: String,
    fraud_description: String,

    // Bank Details
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

    // OPTIONAL Card Fraud Section
    card_holder: String,
    card_last4: String,
    card_type: String,
    issuing_bank: String,

    // Uploaded Files
    files: {
      aadhar: String,
      gd_copy: String,
      bank_statement: [String],
      card_copy: String,
      other_docs: [String],
    },

    isRead: {
      type: Boolean,
      default: false,
    },
    status:{
      type:String,
      
    }
  },
  { timestamps: true }
);

/* ---------------------------------------------------
   AUTO GENERATE COMPLAINT ID (DDMMYYYY/0001 format)
---------------------------------------------------- */

ComplaintSchema.pre("save", async function (next) {
  if (this.complaint_id) return next(); // already generated

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();

  const datePrefix = `${dd}${mm}${yyyy}`; // e.g., "28012025"

  // Count existing complaints created TODAY
  const count = await mongoose.model("Complaint").countDocuments({
    complaint_id: { $regex: `^${datePrefix}` },
  });

  const serial = String(count + 1).padStart(4, "0"); // 0001, 0002...

  this.complaint_id = `${datePrefix}/${serial}`;

  next();
});

module.exports = mongoose.model("Complaint", ComplaintSchema);
