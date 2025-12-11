const path = require('path')
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const fs = require("fs");
const multer = require('multer')
const { v4: uuidv4 } = require("uuid");

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

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});


// --------------------------
// Multer setup (file uploads)
// --------------------------
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => {
//     const folder = "cyber-cell";    // your Cloudinary folder
//     return {
//       folder,
//       resource_type: "auto",         // supports PDFs, images, etc.
//       public_id: `${Date.now()}_${uuidv4()}`,
//       format: undefined,             // auto-detect file type
//     };
//   },
// });

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const folder = "cyber-cell";
    const ext = file.mimetype;

    let resourceType = "auto";

    // FORCE PDFs to raw (this fixes your problem)
    if (ext === "application/pdf") {
      resourceType = "raw";
    }

    return {
      folder,
      resource_type: resourceType,
      public_id: `${Date.now()}_${uuidv4()}`,
    };
  },
});



const upload = multer({ storage });

const cpUpload = upload.fields([
  { name: "aadhar", maxCount: 1 },
  { name: "gd_copy", maxCount: 1 },
  { name: "bank_statement", maxCount: 10 },
  { name: "card_copy", maxCount: 10 },
  { name: "other_doc", maxCount: 10 },
]);


module.exports = cpUpload;