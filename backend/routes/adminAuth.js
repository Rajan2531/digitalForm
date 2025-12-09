const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const { createAccessToken, createRefreshToken, hashToken } = require("./../utils/token");

const router = express.Router();

const COOKIE_NAME = "admin_refresh_token";

const cookieOptions = () => ({
  httpOnly: true,
  secure: true,
  sameSite: "Strict",

});

// --- LOGIN ---
router.post("/login", async (req, res) => {
  console.log("function called")
  const { email, password } = req.body;
 console.log(email, password);
  const admin = await Admin.findOne({ email: email.toLowerCase() });
  if (!admin) return res.status(401).json({ message: "Invalid credentials" });

  const ok = await bcrypt.compare(password, admin.passwordHash);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const payload = { id: admin._id, email: admin.email };

  const accessToken = createAccessToken(payload);
  const refreshToken = createRefreshToken(payload);

  admin.refreshTokenHash = hashToken(refreshToken);
  admin.refreshTokenExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await admin.save();

  res.cookie(COOKIE_NAME, refreshToken, cookieOptions());
  res.json({ accessToken, admin: { name: admin.name, email: admin.email } });
});

// --- REFRESH TOKEN ---
router.post("/refresh", async (req, res) => {
  const refreshToken = req.cookies[COOKIE_NAME];
  if (!refreshToken) return res.status(401).json({ message: "No refresh token" });

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const admin = await Admin.findById(decoded.id);

    if (!admin || !admin.refreshTokenHash) {
      return res.status(401).json({ message: "Invalid token" });
    }

    if (hashToken(refreshToken) !== admin.refreshTokenHash) {
      admin.refreshTokenHash = null;
      await admin.save();
      return res.status(401).json({ message: "Replay detected" });
    }

    const payload = { id: admin._id, email: admin.email };
    const newAccessToken = createAccessToken(payload);
    const newRefreshToken = createRefreshToken(payload);

    admin.refreshTokenHash = hashToken(newRefreshToken);
    await admin.save();

    res.cookie(COOKIE_NAME, newRefreshToken, cookieOptions());
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    return res.status(401).json({ message: "Expired refresh token" });
  }
});

// --- LOGOUT ---
router.post("/logout", async (req, res) => {
  res.clearCookie(COOKIE_NAME, { path: "/api/auth/refresh" });
  res.json({ ok: true });
});

// --- SEED ADMIN (DEV ONLY) ---
router.post("/seed-admin", async (req, res) => {
  if (process.env.NODE_ENV === "production") {
    return res.status(403).json({ message: "Disabled in production" });
  }

  const { email, password, name } = req.body;
  const exists = await Admin.findOne({ email });
  if (exists) return res.status(400).json({ message: "Admin exists" });

  const bcrypt = require("bcrypt");
  const salt = await bcrypt.genSalt(10);

  const admin = new Admin({
    email,
    name,
    passwordHash: await bcrypt.hash(password, salt),
  });

  await admin.save();
  res.json({ ok: true, admin });
});

module.exports = router;
