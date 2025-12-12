// const PDFDocument = require("pdfkit");
// const Complaint = require("../models/complaintModel");
// const catchAsync = require("../utils/catchAsync");
// const appError = require("../utils/appError");


// exports.getPDF = catchAsync(async (req, res, next) => {
//   const { id } = req.params;
//   const complaint = await Complaint.findById(id);

//   if (!complaint) {
//     return next(new appError(404, "Complaint not found."));
//   }

//   const doc = new PDFDocument({
//     size: "A4",
//     margin: 40,
//   });

//   res.setHeader("Content-Type", "application/pdf");
//   res.setHeader(
//     "Content-Disposition",
//     `attachment; filename=complaint_${id}.pdf`
//   );

//   doc.pipe(res);

//   // ------------------------------
//   // PDF CONTENT STARTS
//   // ------------------------------

//   doc.fontSize(22).text("Cyber Cell Complaint Report", { align: "center" });
//   doc.moveDown();

//   doc.fontSize(16).text(`Complaint ID: ${complaint.complaint_id}`);
//   doc.text(`Created At: ${new Date(complaint.createdAt).toLocaleString()}`);
//   doc.moveDown();

//   doc.fontSize(18).text("Complainant Details", { underline: true });
//   doc.fontSize(13).text(`
// Name: ${complaint.complainant_name}
// Relation: ${complaint.relation}
// Phone: ${complaint.phone_no}
// Email: ${complaint.email_id}
// DOB: ${complaint.dob}
// Age: ${complaint.age}
// Sex: ${complaint.sex}
//     `);
//   doc.moveDown();

//   doc.fontSize(18).text("Fraud Information", { underline: true });
//   doc.fontSize(13).text(`
// GD Number: ${complaint.gd_case_no}
// Police Station: ${complaint.police_station}
// Fraudster Phone: ${complaint.fraudster_phone}
// Total Amount: ₹${complaint.total_amount?.toLocaleString()}
//     `);

//   doc.moveDown();
//   doc.fontSize(14).text("Fraud Description:");
//   doc.fontSize(12).text(complaint.fraud_description || "—");
//   doc.moveDown();

//   // ------------------------------
//   // BANK DETAILS
//   // ------------------------------
//   if (complaint.banks?.length) {
//     doc.addPage();
//     doc.fontSize(20).text("Bank & Transaction Details", { underline: true });
//     doc.moveDown();

//     complaint.banks.forEach((bank, idx) => {
//       doc.fontSize(16).text(`Bank ${idx + 1}: ${bank.bank_name}`);
//       doc.fontSize(12).text(`Account No: ${bank.account_no}`);
//       doc.text(`IFSC: ${bank.ifsc}`);
//       doc.moveDown();

//       if (bank.transactions?.length) {
//         doc.fontSize(14).text("Transactions:");
//         bank.transactions.forEach((tx) => {
//           doc
//             .fontSize(11)
//             .text(
//               ` - Ref: ${tx.refNo}, Date: ${tx.date}, Time: ${tx.time}, Amount: ₹${tx.amount}`
//             );
//         });
//       }
//       doc.moveDown();
//     });
//   }

//   // ------------------------------
//   // DOCUMENT LINKS
//   // ------------------------------
//   doc.addPage();
//   doc.fontSize(20).text("Uploaded Documents", { underline: true });
//   doc.moveDown();

//   const files = complaint.files || {};

//   Object.entries(files).forEach(([key, val]) => {
//     const arr = Array.isArray(val) ? val : [val];

//     doc.fontSize(14).text(key.replace(/_/g, " ").toUpperCase());
//     arr.forEach((file) => {
//       doc.fontSize(10).fillColor("blue").text(file, {
//         link: file,
//         underline: true,
//       });
//     });
//     doc.moveDown();
//   });

//   // END
//   doc.end();
// });


const PDFDocument = require("pdfkit");
const qr = require("qr-image");
const Complaint = require("../models/complaintModel");
const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");

exports.getPDF = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const complaint = await Complaint.findById(id);
  if (!complaint) return next(new appError(404, "Complaint not found."));

  const doc = new PDFDocument({ size: "A4", margin: 40 });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename=complaint_${id}.pdf`);
  doc.pipe(res);

  // ---------------------------------------------
  // HEADER BAR
  // ---------------------------------------------
  doc.rect(0, 0, 600, 70).fill("#1e3a8a");
  doc.fillColor("white").fontSize(24).text("Cyber Cell Complaint Report", 40, 20);

  const qrPng = qr.imageSync(complaint.complaint_id, { type: "png" });
  doc.image(qrPng, 500, 15, { width: 55 });

  doc.moveDown(2);

  // ---------------------------------------------
  // HELPERS
  // ---------------------------------------------
  const section = (title) => {
    doc.moveDown(1);
    doc.fontSize(16).fillColor("#1f2937").text(title);
    doc
      .moveTo(40, doc.y + 2)
      .lineTo(555, doc.y + 2)
      .strokeColor("#9ca3af")
      .stroke();
    doc.moveDown(0.7);
  };

  const kv = (key, value) => {
    doc
      .fontSize(12)
      .fillColor("#374151")
      .text(`${key}: `, { continued: true })
      .font("Helvetica-Bold")
      .text(value || "—")
      .font("Helvetica");
  };

  const ensureSpace = (needed = 100) => {
    if (doc.y + needed > 750) {
      doc.addPage();
      doc.y = 40;
    }
  };

  // ---------------------------------------------
  // COMPLAINT METADATA
  // ---------------------------------------------
  section("Complaint Metadata");
  kv("Complaint ID", complaint.complaint_id);
  kv("Created At", new Date(complaint.createdAt).toLocaleString());
  kv("GD Number", complaint.gd_case_no);
  kv("NCRP Number", complaint.ncrp)
  kv("Police Station", complaint.police_station);

  // ---------------------------------------------
  // COMPLAINANT DETAILS
  // ---------------------------------------------
  section("Complainant Details");
  kv("Name", complaint.complainant_name);
  kv("Relation", complaint.relation);
  kv("Phone", complaint.phone_no);
  kv("Email", complaint.email_id);
  kv("DOB", complaint.dob);
  kv("Age", complaint.age);
  kv("Sex", complaint.sex);
  kv("Address", complaint.present_address)

  // ---------------------------------------------
  // FRAUD INFORMATION
  // ---------------------------------------------
  section("Fraud Information");
  kv("Fraudster Phone", complaint.fraudster_phone);
  kv("Amount Lost", `Rs ${(complaint.total_amount || 0).toLocaleString()}`);

  doc.moveDown(0.5);
  doc.fontSize(13).fillColor("#111827").text("Fraud Description:");
  doc.moveDown(0.5);

  const boxTop = doc.y;
  const padding = 10;
  const desc = complaint.fraud_description || "—";

  const descHeight = doc.heightOfString(desc, {
    width: 515 - padding * 2,
    align: "justify",
  });

  ensureSpace(descHeight + 50);

  const boxHeight = descHeight + padding * 2;
  doc.rect(40, boxTop, 515, boxHeight).stroke("#d1d5db");

  doc
    .fontSize(11)
    .fillColor("#374151")
    .text(desc, 40 + padding, boxTop + padding, {
      width: 515 - padding * 2,
      align: "justify",
    });

  doc.y = boxTop + boxHeight + 20;

  // ---------------------------------------------
  // BANK DETAILS – CLEAN + PROPERLY ALIGNED
  // ---------------------------------------------
  if (complaint.banks?.length) {
    doc.addPage();
    section("Bank & Transaction Details");

    complaint.banks.forEach((bank, bi) => {
      ensureSpace(120);

      doc.fontSize(15).fillColor("#1f2937").text(`Bank ${bi + 1}: ${bank.bank_name}`);
      kv("Account Number", bank.account_no);
      kv("IFSC", bank.ifsc);

      doc.moveDown(0.7);

      // Table Header
      doc.rect(40, doc.y, 515, 22).fill("#1e40af");
      doc.fillColor("white").fontSize(11);

      doc.text("Ref No", 50, doc.y + 6, { width: 150 });
      doc.text("Date", 200, doc.y + 6, { width: 100 });
      doc.text("Time", 300, doc.y + 6, { width: 100 });
      doc.text("Amount (₹)", 410, doc.y + 6);

      doc.moveDown(2);

      // Table Rows
      bank.transactions.forEach((tx) => {
        ensureSpace(30);

        doc.rect(40, doc.y, 515, 20).stroke("#e5e7eb");

        let rowY = doc.y + 5;
        doc.fillColor("#111827").fontSize(10);

        doc.text(tx.refNo || "—", 50, rowY, { width: 150 });
        doc.text(tx.date || "—", 200, rowY, { width: 100 });
        doc.text(tx.time || "—", 300, rowY, { width: 100 });
        doc.text(tx.amount ? `Rs ${tx.amount}` : "—", 410, rowY);

        doc.moveDown(1.5);
      });

      doc.moveDown(1);
    });
  }

  // ---------------------------------------------
  // DOCUMENT LINKS
  // ---------------------------------------------
  doc.addPage();
  section("Uploaded Documents");

  const files = complaint.files || {};

  Object.entries(files).forEach(([key, val]) => {
    const list = Array.isArray(val) ? val : [val];

    doc.fontSize(14).fillColor("#1f2937").text(key.replace(/_/g, " ").toUpperCase());
    doc.moveDown(0.3);

    list.forEach((file) => {
      doc
        .fontSize(11)
        .fillColor("#2563eb")
        .text("➤ " + file, {
          link: file,
          underline: true,
          indent: 10,
        });
    });

    doc.moveDown(1);
  });

  // ---------------------------------------------
  // SIGNATURE
  // ---------------------------------------------
  doc.moveDown(3);
  doc.fontSize(12).fillColor("#374151").text("Officer Signature:", 40);

  doc.moveTo(40, doc.y + 20).lineTo(300, doc.y + 20).stroke("#9ca3af");
  doc.moveDown(4);

  doc.fontSize(10).fillColor("#6b7280").text("Generated by Cyber Cell Digital System");

  doc.end();
});
