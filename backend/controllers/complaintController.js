const Complaint = require("../models/complaintModel");
const XLSX = require("xlsx");
// exports.createComplaint = async(req, res, next)=>{
//     try{
//         const {police_station, gd_case_no, complainant_name, relation, profession, present_address, phone_no, email_id, total_amount, amount_from, amount_to, fraud_description} = req.body;
//         const banks = JSON.parse(req.body.transactions || "[]");
//         const files = {
//             aadhar: req.files["aadhar"]?.[0]?.filename || "",
//             gd_copy: req.files["gd_copy"]?.[0]?.filename || "",
//             bank_statement: req.files["bank_statement"]?.[0]?.filename || "",
//             card_copy:req.files["card_copy"]?.[0]?.filename || "",
//             other_docs: (req.files["other_doc"] || []).map((f)=>f.filename),
//         }

//         const complaint = await Complaint.create({police_station, gd_case_no, complainant_name, relation, profession, present_address, total_amount,
//                              amount_from, amount_to, fraud_description, banks, files
//         })

//         res.status(200).json({
//             ok:true,
//             message:"Complaint saved successfully"
//         })

//     } catch(err){
//         console.log(err);
//         res.status(500).json({
//             ok:false,
//             error: "Failed to save complaint"
//         })
//     }
// }

// new create complaint controller

exports.createComplaint = async (req, res, next) => {
  try {
    const {
      police_station,
      gd_case_no,
      complainant_name,
      relation,
      profession,
      present_address,
      phone_no,
      email_id,
      total_amount,
      amount_from,
      amount_to,
      fraud_description,
      dob,
      age,
      sex,
      fraudster_phone,

      // Optional card fraud fields
      card_holder,
      card_last4,
      card_type,
      issuing_bank,
    } = req.body;

    // Parse bank + transactions array
    const banks = JSON.parse(req.body.transactions || "[]");

    // File uploads
    files = {
      aadhar: req.files["aadhar"]?.[0]?.path,
      gd_copy: req.files["gd_copy"]?.[0]?.path,
      bank_statement: (req.files["bank_statement"] || []).map((f)=>f.path),
      card_copy: req.files["card_copy"]?.[0]?.path,
      other_docs: (req.files["other_doc"] || []).map((f) => f.path),
    };

    // Create complaint entry
    const complaint = await Complaint.create({
      police_station,
      gd_case_no,
      complainant_name,
      relation,
      profession,
      present_address,
      phone_no,
      email_id,
      dob,
      age,
      sex,
      fraudster_phone,

      total_amount,
      amount_from,
      amount_to,
      fraud_description,

      // Banks & files
      banks,
      files,

      // Optional card-fraud fields
      card_holder,
      card_last4,
      card_type,
      issuing_bank,
    });

    res.status(200).json({
      ok: true,
      message: "Complaint saved successfully",
      complaint_id: complaint.complaint_id, // return the generated ID
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      error: "Failed to save complaint",
    });
  }
};

exports.getAllComplaints = async (req, res, next) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json({ ok: true, data: complaints });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: "Failed to load complaints" });
  }
};

exports.exportToCSV = async (req, res) => {
  try {
    const complaints = await Complaint.find().lean();
    const ws = XLSX.utils.json_to_sheet(complaints);
    const csv = XLSX.utils.sheet_to_csv(ws);
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="complaints.csv"'
    );
    res.setHeader("Content-Type", "text/csv");
    res.send(csv);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error exporting CSV");
  }
};

// --------------------------------------
// UPDATE STATUS
// --------------------------------------
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
   console.log(status)
    await Complaint.findByIdAndUpdate(req.params.id, { status });

    res.json({ success: true, message: "Status updated" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// --------------------------------------
// FULL UPDATE (FRONTEND EDIT MODE)
// Supports: complaint info + complainant info + bank edit + tx edit
// --------------------------------------
exports.updateFull = async (req, res) => {
  try {
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      message: "Complaint updated successfully",
      data: updatedComplaint,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const ExcelJS = require("exceljs");

exports.exportComplaintsStyledExcel = async (req, res) => {
  try {
    const complaints = await Complaint.find().lean();

    if (!complaints.length) {
      return res
        .status(404)
        .json({ ok: false, message: "No complaints found" });
    }

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Cyber Cell Complaints", {
      properties: { defaultColWidth: 22 },
      pageSetup: { orientation: "landscape" },
    });

    // ====== TITLE ROW ======
    const title = `Cyber Cell Complaints Report — Exported on ${new Date().toLocaleString(
      "en-IN"
    )}`;
    sheet.mergeCells("A1", "K1");
    const titleCell = sheet.getCell("A1");
    titleCell.value = title;
    titleCell.font = { size: 13, bold: true, color: { argb: "FFFFFF" } };
    titleCell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "1E3A8A" },
    };
    titleCell.alignment = { horizontal: "center", vertical: "middle" };
    sheet.getRow(1).height = 24;

    // ====== COLUMN HEADERS ======
    const headerRow = sheet.addRow([
      "#",
      "Name",
      "Police Station",
      "GD / Case No",
      "Phone",
      "Email",
      "Amount (₹)",
      "Fraud Period",
      "Fraud Type / Description",
      "Bank Details",
      "Files",
    ]);

    headerRow.font = { bold: true, color: { argb: "FFFFFF" } };
    headerRow.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "2563EB" },
    };
    headerRow.alignment = {
      vertical: "middle",
      horizontal: "center",
      wrapText: true,
    };
    headerRow.height = 18;

    headerRow.eachCell((cell) => {
      cell.border = {
        top: { style: "thin", color: { argb: "999999" } },
        left: { style: "thin", color: { argb: "999999" } },
        bottom: { style: "thin", color: { argb: "999999" } },
        right: { style: "thin", color: { argb: "999999" } },
      };
    });

    // ====== ROWS ======
    complaints.forEach((c, i) => {
      // Flatten bank + files
      const banks = (c.banks || [])
        .map(
          (b, bi) =>
            `${b.bank_name || "-"} ("A/c: "${b.account_no || ""})\n` +
            (b.transactions || [])
              .map(
                (t) =>
                  `• Fraud Amount: ₹${t.amount || "-"} | Date: ${
                    t.date || ""
                  } Time: ${t.time || ""} (Ref no: ${t.refNo || "-"})`
              )
              .join("\n")
        )
        .join("\n————————\n");

      const filesObj = c.files || {};
      const files = Object.entries(filesObj)
        .filter(([_, v]) => v && v.length > 0)
        .map(([k, v]) =>
          Array.isArray(v) ? `${k}: ${v.join(", ")}` : `${k}: ${v}`
        )
        .join("\n");

      const fraudPeriod = `${c.amount_from || "-"} → ${c.amount_to || "-"}`;

      const row = sheet.addRow([
        i + 1,
        c.complainant_name || "",
        c.police_station || "",
        c.gd_case_no || "",
        c.phone_no || "",
        c.email_id || "",
        c.total_amount || "",
        fraudPeriod,
        c.fraud_description || "",
        banks || "—",
        files || "—",
      ]);

      row.alignment = { vertical: "top", wrapText: true };
      row.height = Math.max(25, row.height);
      row.eachCell((cell) => {
        cell.border = {
          top: { style: "thin", color: { argb: "CCCCCC" } },
          left: { style: "thin", color: { argb: "CCCCCC" } },
          bottom: { style: "thin", color: { argb: "CCCCCC" } },
          right: { style: "thin", color: { argb: "CCCCCC" } },
        };
      });

      // Alternating row shading
      if (i % 2 === 0) {
        row.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "F8FAFC" },
        };
      }
    });

    // ====== AUTO WIDTH ======
    sheet.columns.forEach((col) => {
      let maxLen = 10;
      col.eachCell({ includeEmpty: true }, (cell) => {
        const val = cell.value ? cell.value.toString().length : 10;
        if (val > maxLen) maxLen = val;
      });
      col.width = Math.min(maxLen + 2, 45);
    });

    // ====== RESPONSE ======
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=cybercell_compact_${Date.now()}.xlsx`
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error("❌ Error exporting compact Excel:", err);
    res
      .status(500)
      .json({ ok: false, error: "Failed to export compact Excel" });
  }
};

exports.markAsRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id)
    const updated = await Complaint.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );
    if (!updated)
      return res.status(404).json({ ok: false, error: "Not found" });
    res.json({ ok: true, data: updated });
  } catch (err) {
    console.error("markAsRead error:", err);
    res.status(500).json({ ok: false, error: "Failed to mark as read" });
  }
};
