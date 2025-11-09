const express = require("express");
const cors = require("cors");
const multer = require("multer");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const { existsSync } = require("fs");
const XLSX = require("xlsx");
const { v4: uuidv4 } = require("uuid");

dotenv.config();


// 
const complaintController = require("./controllers/complaintController")
const Complaint = require("./models/Complaint")


// ✅ CommonJS already gives us __dirname, so no need to define it manually
const STORAGE_PATH = process.env.STORAGE_PATH || path.join(__dirname, "data");
const UPLOADS_DIR = path.join(STORAGE_PATH, "uploads");
const EXCEL_PATH = path.join(STORAGE_PATH, "complaints.xlsx");
const MAX_FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE_BYTES || "10485760", 10);

const app = express();
app.use(cors({
    "origin":"*"
}));
app.use(express.json());


// ✅ Ensure directories exist before multer tries to save files
(async function ensureDirectories() {
  try {
    await fs.promises.mkdir(UPLOADS_DIR, { recursive: true });
    console.log(`✅ Storage initialized at: ${STORAGE_PATH}`);
  } catch (err) {
    console.error("❌ Error creating storage directories:", err);
  }
})();

// ✅ Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const safeName = path
      .basename(file.originalname, ext)
      .replace(/[<>:"/\\|?*]+/g, "_") // replace invalid Windows characters
      .replace(/\s+/g, "_") // replace spaces
      .slice(0, 40);
    cb(null, `${Date.now()}_${uuidv4()}_${safeName}${ext}`);
  },
});
const upload = multer({ storage, limits: { fileSize: MAX_FILE_SIZE } });

// ✅ Root route



app.get("/", (req, res) => {
  res.send("🚀 Cyber Cell Backend (Async Version) Running Successfully!");
});

// ✅ Helper: Save record to Excel file
async function saveRecordToExcel(record) {
  try {
    let workbook;
    if (!existsSync(EXCEL_PATH)) {
      workbook = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet([record]);
      XLSX.utils.book_append_sheet(workbook, ws, "complaints");
    } else {
      workbook = XLSX.readFile(EXCEL_PATH);
      const ws = workbook.Sheets["complaints"];
      const existing = XLSX.utils.sheet_to_json(ws, { defval: "" });
      existing.push(record);
      const newWs = XLSX.utils.json_to_sheet(existing);
      workbook.Sheets["complaints"] = newWs;
    }
    XLSX.writeFile(workbook, EXCEL_PATH);
    console.log("📄 Record saved to Excel successfully");
  } catch (error) {
    console.error("❌ Error saving record to Excel:", error);
    throw new Error("Failed to write to Excel file");
  }
}

// ✅ Complaint route
const cpUpload = upload.fields([
  { name: "aadhar", maxCount: 1 },
  { name: "gd_copy", maxCount: 1 },
  { name: "bank_statement", maxCount: 1 },
  { name: "card_copy", maxCount: 1 },
  { name: "other_doc", maxCount: 3 },
]);





app.get("/api/complaints", complaintController.getAllComplaints);

app.get("/api/export/csv", complaintController.exportToCSV);
app.get("/api/export/excel", complaintController.exportComplaintsStyledExcel)
app.post("/api/complaint", cpUpload, complaintController.createComplaint);
app.patch("/api/complaints/:id/mark-read", complaintController.markAsRead)

// ✅ Serve uploaded files (for police to view attachments)
app.use("/uploads", express.static(UPLOADS_DIR));

// ✅ Start server

module.exports = app;
