const express = require("express");
const requireAdmin = require("../middleware/authAdmin");
const Admin = require("../models/Admin");

const router = express.Router();

router.get("/me", requireAdmin, async (req, res) => {
  const admin = await Admin.findById(req.admin.id)
    .select("-passwordHash -refreshTokenHash");
  res.json({ admin });
});

module.exports = router;
