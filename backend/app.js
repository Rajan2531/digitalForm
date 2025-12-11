// const express = require("express");
// const cors = require("cors");
// const multer = require("multer");
// const dotenv = require("dotenv");
// const path = require("path");
// const fs = require("fs");
// const { existsSync } = require("fs");
// const XLSX = require("xlsx");
// const { v4: uuidv4 } = require("uuid");

// dotenv.config();


// // 
// const complaintController = require("./controllers/complaintController")
// const Complaint = require("./models/Complaint")


// // ✅ CommonJS already gives us __dirname, so no need to define it manually
// const STORAGE_PATH = process.env.STORAGE_PATH || path.join(__dirname, "data");
// const UPLOADS_DIR = path.join(STORAGE_PATH, "uploads");
// const EXCEL_PATH = path.join(STORAGE_PATH, "complaints.xlsx");
// const MAX_FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE_BYTES || "10485760", 10);

// const app = express();
// app.use(cors({
//     "origin":"*"
// }));
// app.use(express.json());


// // ✅ Ensure directories exist before multer tries to save files
// (async function ensureDirectories() {
//   try {
//     await fs.promises.mkdir(UPLOADS_DIR, { recursive: true });
//     console.log(`✅ Storage initialized at: ${STORAGE_PATH}`);
//   } catch (err) {
//     console.error("❌ Error creating storage directories:", err);
//   }
// })();

// // ✅ Multer setup
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, UPLOADS_DIR),
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     const safeName = path
//       .basename(file.originalname, ext)
//       .replace(/[<>:"/\\|?*]+/g, "_") // replace invalid Windows characters
//       .replace(/\s+/g, "_") // replace spaces
//       .slice(0, 40);
//     cb(null, `${Date.now()}_${uuidv4()}_${safeName}${ext}`);
//   },
// });
// const upload = multer({ storage, limits: { fileSize: MAX_FILE_SIZE } });

// // ✅ Root route



// app.get("/", (req, res) => {
//   res.send("🚀 Cyber Cell Backend (Async Version) Running Successfully!");
// });

// // ✅ Helper: Save record to Excel file
// async function saveRecordToExcel(record) {
//   try {
//     let workbook;
//     if (!existsSync(EXCEL_PATH)) {
//       workbook = XLSX.utils.book_new();
//       const ws = XLSX.utils.json_to_sheet([record]);
//       XLSX.utils.book_append_sheet(workbook, ws, "complaints");
//     } else {
//       workbook = XLSX.readFile(EXCEL_PATH);
//       const ws = workbook.Sheets["complaints"];
//       const existing = XLSX.utils.sheet_to_json(ws, { defval: "" });
//       existing.push(record);
//       const newWs = XLSX.utils.json_to_sheet(existing);
//       workbook.Sheets["complaints"] = newWs;
//     }
//     XLSX.writeFile(workbook, EXCEL_PATH);
//     console.log("📄 Record saved to Excel successfully");
//   } catch (error) {
//     console.error("❌ Error saving record to Excel:", error);
//     throw new Error("Failed to write to Excel file");
//   }
// }

// // ✅ Complaint route
// const cpUpload = upload.fields([
//   { name: "aadhar", maxCount: 1 },
//   { name: "gd_copy", maxCount: 1 },
//   { name: "bank_statement", maxCount: 1 },
//   { name: "card_copy", maxCount: 1 },
//   { name: "other_doc", maxCount: 3 },
// ]);





// app.get("/api/complaints", complaintController.getAllComplaints);

// app.get("/api/export/csv", complaintController.exportToCSV);
// app.get("/api/export/excel", complaintController.exportComplaintsStyledExcel)
// app.post("/api/complaint", cpUpload, complaintController.createComplaint);
// app.patch("/api/complaints/:id/mark-read", complaintController.markAsRead)

// // ✅ Serve uploaded files (for police to view attachments)
// app.use("/uploads", express.static(UPLOADS_DIR));

// // ✅ Start server

// module.exports = app;




// server.js (refactored + security + update route)
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const { existsSync } = require("fs");
const XLSX = require("xlsx");
const { v4: uuidv4 } = require("uuid");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xssClean = require("xss-clean");
const hpp = require("hpp");
const compression = require("compression");
const pdfRouter = require("./routes/exportRouter")
const cookieParser = require('cookie-parser');

dotenv.config();

// controllers & models
const complaintController = require("./controllers/complaintController");
const Complaint = require("./models/complaintModel");

const app = express();

const adminRouter = require('./routes/adminRouter')
const complaintRouter = require("./routes/complaintRouter")
const exportRouter = require('./routes/exportRouter')












// --------------------------
// Configuration & constants
// --------------------------
const STORAGE_PATH = process.env.STORAGE_PATH || path.join(__dirname, "data");
const UPLOADS_DIR = path.join(STORAGE_PATH, "uploads");
const EXCEL_PATH = path.join(STORAGE_PATH, "complaints.xlsx");
const MAX_FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE_BYTES || "10485760", 10); // 10 MB default

const JSON_LIMIT = process.env.JSON_LIMIT || "10mb";
const RATE_WINDOW_MS = parseInt(process.env.RATE_WINDOW_MS || String(15 * 60 * 1000), 10); // 15 min
const RATE_MAX = parseInt(process.env.RATE_MAX || "200", 10); // max requests per window
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(",") : ["*"];

// --------------------------
// Ensure directories exist
// --------------------------
(async function ensureDirectories() {
  try {
    await fs.promises.mkdir(UPLOADS_DIR, { recursive: true });
    console.log(`✅ Storage initialized at: ${STORAGE_PATH}`);
  } catch (err) {
    console.error("❌ Error creating storage directories:", err);
  }
})();



// --------------------------
// Security middlewares
// --------------------------
app.disable("x-powered-by");
app.use(helmet());

 // remove $ and dots from req data

app.use(hpp()); // prevent param pollution
app.use(compression()); // gzip responses
app.use(cookieParser());

// --------------------------
// Logging and parsers
// --------------------------
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(express.json({ limit: JSON_LIMIT }));
app.use(express.urlencoded({ extended: true, limit: JSON_LIMIT }));



app.use(
  cors({
    origin: ["http://localhost:5173", "https://digital-form-kappa.vercel.app", 'https://digital-form.netlify.app'],
    credentials: true
  })
);
// --------------------------
// Rate limiting
// --------------------------
const limiter = rateLimit({
  windowMs: RATE_WINDOW_MS,
  max: RATE_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// --------------------------
// Static uploads route
// --------------------------
app.use("/uploads", express.static(UPLOADS_DIR));

// --------------------------
// Routes - your controllers
// --------------------------


app.use("/api/v1/admin", adminRouter);  // protected routes
app.use("/api/v1/complaints", complaintRouter);
app.use("/api/v1/exports", exportRouter);
app.get("/", (req, res) => {
  res.send("🚀 Cyber Cell Backend (Secure) Running Successfully!");
});

// listing / export routes
// app.get("/api/complaints/:id/pdf", pdfRouter.getPDF )

// app.get("/api/export/csv", complaintController.exportToCSV);
// app.get("/api/export/excel", complaintController.exportComplaintsStyledExcel);

// create complaint with file uploads


// // mark as read
// app.patch("/api/complaints/:id/mark-read", complaintController.markAsRead);

// // update full complaint (used by frontend Edit -> Save


// // get single complaint
// app.get("/api/complaints/:id", complaintController.getComplaint);

// // delete complaint (optional)
// app.delete("/api/complaints/:id", complaintController.deleteComplaint);

// --------------------------
// Generic error handler
// --------------------------
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err && err.stack ? err.stack : err);
  if (err.message && err.message.startsWith("CORS policy")) {
    return res.status(403).json({ success: false, message: err.message });
  }
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// --------------------------
// Export app (start elsewhere)
// --------------------------
module.exports = app;
