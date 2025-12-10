const PDFDocument = require("pdfkit");
const Complaint = require("./../models/Complaint")
exports.getPDF = async (req, res) => {
  try {
    const { id } = req.params;
    const complaint = await Complaint.findById(id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    const doc = new PDFDocument({
      size: "A4",
      margin: 40,
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=complaint_${id}.pdf`
    );

    doc.pipe(res);

    // ------------------------------
    // PDF CONTENT STARTS
    // ------------------------------

    doc.fontSize(22).text("Cyber Cell Complaint Report", { align: "center" });
    doc.moveDown();

    doc.fontSize(16).text(`Complaint ID: ${complaint.complaint_id}`);
    doc.text(`Created At: ${new Date(complaint.createdAt).toLocaleString()}`);
    doc.moveDown();

    doc.fontSize(18).text("Complainant Details", { underline: true });
    doc.fontSize(13).text(`
Name: ${complaint.complainant_name}
Relation: ${complaint.relation}
Phone: ${complaint.phone_no}
Email: ${complaint.email_id}
DOB: ${complaint.dob}
Age: ${complaint.age}
Sex: ${complaint.sex}
    `);
    doc.moveDown();

    doc.fontSize(18).text("Fraud Information", { underline: true });
    doc.fontSize(13).text(`
GD Number: ${complaint.gd_case_no}
Police Station: ${complaint.police_station}
Fraudster Phone: ${complaint.fraudster_phone}
Total Amount: ₹${complaint.total_amount?.toLocaleString()}
    `);

    doc.moveDown();
    doc.fontSize(14).text("Fraud Description:");
    doc.fontSize(12).text(complaint.fraud_description || "—");
    doc.moveDown();

    // ------------------------------
    // BANK DETAILS
    // ------------------------------
    if (complaint.banks?.length) {
      doc.addPage();
      doc.fontSize(20).text("Bank & Transaction Details", { underline: true });
      doc.moveDown();

      complaint.banks.forEach((bank, idx) => {
        doc.fontSize(16).text(`Bank ${idx + 1}: ${bank.bank_name}`);
        doc.fontSize(12).text(`Account No: ${bank.account_no}`);
        doc.text(`IFSC: ${bank.ifsc}`);
        doc.moveDown();

        if (bank.transactions?.length) {
          doc.fontSize(14).text("Transactions:");
          bank.transactions.forEach((tx) => {
            doc
              .fontSize(11)
              .text(
                ` - Ref: ${tx.refNo}, Date: ${tx.date}, Time: ${tx.time}, Amount: ₹${tx.amount}`
              );
          });
        }
        doc.moveDown();
      });
    }

    // ------------------------------
    // DOCUMENT LINKS
    // ------------------------------
    doc.addPage();
    doc.fontSize(20).text("Uploaded Documents", { underline: true });
    doc.moveDown();

    const files = complaint.files || {};

    Object.entries(files).forEach(([key, val]) => {
      const arr = Array.isArray(val) ? val : [val];

      doc.fontSize(14).text(key.replace(/_/g, " ").toUpperCase());
      arr.forEach((file) => {
        doc.fontSize(10).fillColor("blue").text(file, {
          link: file,
          underline: true,
        });
      });
      doc.moveDown();
    });

    // END
    doc.end();
    
  } catch (err) {
    console.error("PDF generation error:", err);
    res
      .status(500)
      .json({ message: "PDF generation failed", error: err.message });
  }
};
