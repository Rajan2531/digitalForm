const express = require("express");
const router = express.Router();
const authController = require('./../controllers/authController')

router.route('/login').post(authController.login)
router.route('/me').get(authController.protect, authController.me);
router.route('/logout').get(authController.protect, authController.logout)

module.exports = router;