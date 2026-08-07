const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/authMiddleware");

const {
    getComplaintForm,
    createComplaint,
    getMyComplaints,
    getComplaintById,
    editComplaintPage,
    updateComplaint
} = require("../controllers/complaintController");

router.get("/create", verifyToken, getComplaintForm);
router.post("/create", verifyToken, createComplaint);
router.get("/my-complaints", verifyToken, getMyComplaints);
router.get("/:id/edit", verifyToken, editComplaintPage);
router.post("/:id/edit", verifyToken, updateComplaint);
router.get("/:id", verifyToken, getComplaintById);
module.exports = router;