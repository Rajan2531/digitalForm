const express = require("express");
const router = express.Router();
const complaintController = require('./../controllers/complaintController');
const cpUpload = require('./../utils/fileUploader')
const authController = require('./../controllers/authController')

router.route('/get-all-complaints').get(authController.protect, complaintController.getAllComplaints);
router.route('/').post(cpUpload, complaintController.createComplaint);
router.route('/:id/mark-read').patch(authController.protect, complaintController.markAsRead)
router.route('/:id/update').patch(authController.protect, complaintController.updateFull);
router.route('/:id/status').patch(authController.protect, complaintController.updateStatus)

module.exports = router;