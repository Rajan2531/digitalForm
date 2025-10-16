const Complaint = require("./../models/Complaint");
const XLSX = require("xlsx")
exports.createComplaint = async(req, res, next)=>{
    try{
        const {police_station, gd_case_no, complainant_name, relation, profession, present_address, phone_no, email_id, total_amount, amount_from, amount_to, fraud_description} = req.body;
        const banks = JSON.parse(req.body.transactions || "[]");
        const files = {
            aadhar: req.files["aadhar"]?.[0]?.filename || "",
            gd_copy: req.files["gd_copy"]?.[0]?.filename || "",
            bank_statement: req.files["bank_statement"]?.[0]?.filename || "",
            card_copy:req.files["card_copy"]?.[0]?.filename || "",
            other_docs: (req.files["other_doc"] || []).map((f)=>f.filename),
        }

        const complaint = await Complaint.create({police_station, gd_case_no, complainant_name, relation, profession, present_address, total_amount, 
                             amount_from, amount_to, fraud_description, banks, files
        })
        
        res.status(200).json({
            ok:true, 
            message:"Complaint saved successfully"
        })

    } catch(err){
        console.log(err);
        res.status(500).json({
            ok:false,
            error: "Failed to save complaint"
        })
    }
}

exports.getAllComplaints = async(req, res, next)=>{
    try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json({ ok: true, data: complaints });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: "Failed to load complaints" });
  }
}

exports.exportToCSV = async (req, res) => {
  try {
    const complaints = await Complaint.find().lean();
    const ws = XLSX.utils.json_to_sheet(complaints);
    const csv = XLSX.utils.sheet_to_csv(ws);
    res.setHeader("Content-Disposition", 'attachment; filename="complaints.csv"');
    res.setHeader("Content-Type", "text/csv");
    res.send(csv);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error exporting CSV");
  }
}

// exports.exportComplaintsAsExcel = async (req, res) => {
//   try {
//     // 1️⃣ Fetch all complaints from MongoDB
//     const complaints = await Complaint.find().lean();

//     if (!complaints || complaints.length === 0) {
//       return res.status(404).json({ ok: false, message: "No complaints found to export" });
//     }

//     // 2️⃣ Flatten nested objects (like banks and files) for Excel readability
//     const formatted = complaints.map((c) => ({
//       ID: c._id.toString(),
//       "Complainant Name": c.complainant_name || "",
//       "Police Station": c.police_station || "",
//       "GD Case No": c.gd_case_no || "",
//       "Relation": c.relation || "",
//       "Profession": c.profession || "",
//       "Phone No": c.phone_no || "",
//       "Email ID": c.email_id || "",
//       "Address": c.present_address || "",
//       "Total Amount (₹)": c.total_amount || "",
//       "From Date": c.amount_from || "",
//       "To Date": c.amount_to || "",
//       "Fraud Description": c.fraud_description || "",
//       "Banks": JSON.stringify(c.banks || []),
//       "Files": JSON.stringify(c.files || {}),
//       "Created At": new Date(c.createdAt).toLocaleString(),
//     }));

//     // 3️⃣ Create Excel worksheet
//     const ws = XLSX.utils.json_to_sheet(formatted);

//     // 4️⃣ Create workbook and append sheet
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Complaints");

//     // 5️⃣ Write to buffer
//     const buffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

//     // 6️⃣ Set headers and send file
//     res.setHeader(
//       "Content-Disposition",
//       `attachment; filename=cybercell_complaints_${Date.now()}.xlsx`
//     );
//     res.setHeader(
//       "Content-Type",
//       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//     );
//     res.send(buffer);
//   } catch (err) {
//     console.error("❌ Error exporting complaints:", err);
//     res.status(500).json({
//       ok: false,
//       error: "Failed to export complaints as Excel",
//     });
//   }
// };




// exports.exportComplaintsAsExcel = async (req, res) => {
//   try {
//     const complaints = await Complaint.find().lean();

//     if (!complaints.length) {
//       return res.status(404).json({ ok: false, message: "No complaints found to export" });
//     }

//     // 🧩 Helper to flatten bank + transaction data
//     const formatBanks = (banks = []) => {
//       return banks
//         .map((b) => {
//           const txns = (b.transactions || [])
//             .map(
//               (t) =>
//                 `₹${t.amount || "-"} | ${t.date || ""} ${t.time || ""} | Ref: ${
//                   t.refNo || "-"
//                 }`
//             )
//             .join("\n");
//           return `${b.bank_name || "-"} | A/C: ${b.account_no || "-"} | IFSC: ${
//             b.ifsc || "-"
//           }\n${txns}`;
//         })
//         .join("\n\n");
//     };

//     // 🧩 Helper to flatten uploaded files
//     const formatFiles = (files = {}) => {
//       return Object.entries(files)
//         .map(([k, v]) => {
//           if (Array.isArray(v)) {
//             return `${k}: ${v.join(", ")}`;
//           }
//           return `${k}: ${v}`;
//         })
//         .join("\n");
//     };

//     // 🧾 Format data for Excel readability
//     const formatted = complaints.map((c) => ({
//       ID: c._id.toString(),
//       "Complainant Name": c.complainant_name || "",
//       "Police Station": c.police_station || "",
//       "GD Case No": c.gd_case_no || "",
//       Relation: c.relation || "",
//       Profession: c.profession || "",
//       "Phone No": c.phone_no || "",
//       "Email ID": c.email_id || "",
//       Address: c.present_address || "",
//       "Total Amount (₹)": c.total_amount || "",
//       "From Date": c.amount_from || "",
//       "To Date": c.amount_to || "",
//       "Fraud Description": c.fraud_description || "",
//       "Bank Details": formatBanks(c.banks),
//       "Uploaded Files": formatFiles(c.files),
//       "Created At": new Date(c.createdAt).toLocaleString("en-IN", {
//         dateStyle: "medium",
//         timeStyle: "short",
//       }),
//     }));

//     // 🧮 Create Excel workbook
//     const ws = XLSX.utils.json_to_sheet(formatted);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Complaints");

//     // 🧷 Auto width adjustment
//     const colWidths = Object.keys(formatted[0]).map(() => ({ wch: 25 }));
//     ws["!cols"] = colWidths;

//     // 🧱 Send as file buffer
//     const buffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });
//     res.setHeader(
//       "Content-Disposition",
//       `attachment; filename=cybercell_complaints_${Date.now()}.xlsx`
//     );
//     res.setHeader(
//       "Content-Type",
//       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//     );
//     res.send(buffer);
//   } catch (err) {
//     console.error("❌ Error exporting Excel:", err);
//     res.status(500).json({ ok: false, error: "Failed to export complaints as Excel" });
//   }
// };

const ExcelJS = require("exceljs");


// exports.exportComplaintsStyledExcel = async (req, res) => {
//   try {
//     const complaints = await Complaint.find().lean();

//     if (!complaints.length) {
//       return res.status(404).json({ ok: false, message: "No complaints found to export" });
//     }

//     // Create new workbook
//     const workbook = new ExcelJS.Workbook();
//     const sheet = workbook.addWorksheet("Cyber Cell Complaints", {
//       properties: { defaultColWidth: 25 },
//     });

//     // ====== HEADER TITLE ======
//     const title = `Cyber Cell Complaints Report — Exported on ${new Date().toLocaleString(
//       "en-IN"
//     )}`;
//     sheet.mergeCells("A1", "J1");
//     const titleCell = sheet.getCell("A1");
//     titleCell.value = title;
//     titleCell.font = { size: 14, bold: true, color: { argb: "FFFFFF" } };
//     titleCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "1E3A8A" } };
//     titleCell.alignment = { horizontal: "center", vertical: "middle" };
//     sheet.getRow(1).height = 25;

//     // ====== COLUMN HEADERS ======
//     const headerRow = sheet.addRow([
//       "#",
//       "Complainant Name",
//       "Police Station",
//       "GD / Case No",
//       "Profession",
//       "Phone No",
//       "Email ID",
//       "Fraud Amount (₹)",
//       "Fraud Period",
//       "Fraud Description",
//     ]);
//     headerRow.font = { bold: true, color: { argb: "FFFFFF" } };
//     headerRow.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "3B82F6" } };
//     headerRow.alignment = { vertical: "middle", horizontal: "center", wrapText: true };
//     headerRow.height = 20;
//     headerRow.eachCell((cell) => {
//       cell.border = {
//         top: { style: "thin", color: { argb: "999999" } },
//         left: { style: "thin", color: { argb: "999999" } },
//         bottom: { style: "thin", color: { argb: "999999" } },
//         right: { style: "thin", color: { argb: "999999" } },
//       };
//     });

//     // ====== MAIN CONTENT ======
//     complaints.forEach((c, idx) => {
//       // Complaint summary row
//       const fraudPeriod = `${c.amount_from || "-"} → ${c.amount_to || "-"}`;
//       const summaryRow = sheet.addRow([
//         idx + 1,
//         c.complainant_name || "",
//         c.police_station || "",
//         c.gd_case_no || "",
//         c.profession || "",
//         c.phone_no || "",
//         c.email_id || "",
//         c.total_amount || "",
//         fraudPeriod,
//         c.fraud_description || "",
//       ]);
//       summaryRow.eachCell((cell) => {
//         cell.border = {
//           top: { style: "thin" },
//           left: { style: "thin" },
//           bottom: { style: "thin" },
//           right: { style: "thin" },
//         };
//         cell.alignment = { wrapText: true, vertical: "top" };
//       });

//       // ---- Bank Details Section ----
//       if (c.banks?.length) {
//         sheet.addRow([]);
//         const bankHeader = sheet.addRow(["Bank Details"]);
//         sheet.mergeCells(`A${bankHeader.number}:J${bankHeader.number}`);
//         bankHeader.font = { bold: true, color: { argb: "1E3A8A" } };
//         bankHeader.alignment = { horizontal: "left" };

//         c.banks.forEach((b) => {
//           const txns =
//             b.transactions?.length > 0
//               ? b.transactions
//                   .map(
//                     (t) =>
//                       `₹${t.amount} — ${t.date || ""} ${t.time || ""} (Ref: ${
//                         t.refNo || "-"
//                       })`
//                   )
//                   .join("\n")
//               : "No transactions";

//           const bankRow = sheet.addRow([
//             "",
//             `Bank: ${b.bank_name || "-"}`,
//             `A/C: ${b.account_no || "-"}`,
//             `IFSC: ${b.ifsc || "-"}`,
//             "",
//             "",
//             "",
//             "",
//             "",
//             txns,
//           ]);
//           bankRow.eachCell((cell) => {
//             cell.alignment = { wrapText: true, vertical: "top" };
//           });
//         });
//       }

//       // ---- Files Section ----
//       if (c.files) {
//         sheet.addRow([]);
//         const filesRow = sheet.addRow(["Uploaded Files"]);
//         sheet.mergeCells(`A${filesRow.number}:J${filesRow.number}`);
//         filesRow.font = { bold: true, color: { argb: "1E3A8A" } };
//         filesRow.alignment = { horizontal: "left" };

//         const { aadhaar, gd_copy, bank_statement, card_copy, other_docs } = c.files;
//         const fRow = sheet.addRow([
//           "",
//           `Aadhaar: ${aadhaar || "-"}`,
//           `GD Copy: ${gd_copy || "-"}`,
//           `Bank Statement: ${bank_statement || "-"}`,
//           `Card Copy: ${card_copy || "-"}`,
//           `Other Docs: ${
//             Array.isArray(other_docs) && other_docs.length
//               ? other_docs.join(", ")
//               : "-"
//           }`,
//         ]);
//         fRow.eachCell((cell) => {
//           cell.alignment = { wrapText: true };
//         });
//       }

//       // ---- Separator Row ----
//       sheet.addRow([]);
//       const separator = sheet.addRow(["—".repeat(200)]);
//       sheet.mergeCells(`A${separator.number}:J${separator.number}`);
//       separator.font = { color: { argb: "CCCCCC" } };
//     });

//     // Auto-fit column widths
//     sheet.columns.forEach((col) => {
//       let maxLen = 0;
//       col.eachCell({ includeEmpty: true }, (cell) => {
//         const len = cell.value ? cell.value.toString().length : 10;
//         if (len > maxLen) maxLen = len;
//       });
//       col.width = Math.min(maxLen + 2, 50);
//     });

//     // Send the workbook
//     res.setHeader(
//       "Content-Disposition",
//       `attachment; filename=cybercell_complaints_${Date.now()}.xlsx`
//     );
//     res.setHeader(
//       "Content-Type",
//       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//     );

//     await workbook.xlsx.write(res);
//     res.end();
//   } catch (err) {
//     console.error("❌ Error exporting styled Excel:", err);
//     res.status(500).json({ ok: false, error: "Failed to export styled Excel" });
//   }
// };




exports.exportComplaintsStyledExcel = async (req, res) => {
  try {
    const complaints = await Complaint.find().lean();

    if (!complaints.length) {
      return res.status(404).json({ ok: false, message: "No complaints found" });
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
    titleCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "1E3A8A" } };
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
    headerRow.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "2563EB" } };
    headerRow.alignment = { vertical: "middle", horizontal: "center", wrapText: true };
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
                  `• Fraud Amount: ₹${t.amount || "-"} | Date: ${t.date || ""} Time: ${t.time || ""} (Ref no: ${t.refNo || "-"})`
              )
              .join("\n")
        )
        .join("\n————————\n");

      const filesObj = c.files || {};
      const files = Object.entries(filesObj)
        .filter(([_, v]) => v && v.length > 0)
        .map(([k, v]) =>
          Array.isArray(v)
            ? `${k}: ${v.join(", ")}`
            : `${k}: ${v}`
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
    res.status(500).json({ ok: false, error: "Failed to export compact Excel" });
  }
};
