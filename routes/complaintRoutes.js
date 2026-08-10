const verifyWorker = require("../middlewares/workerMiddleware");
const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/authMiddleware");

const {
    getComplaintForm,
    createComplaint,
    getMyComplaints,
    getComplaintById,
    editComplaintPage,
    updateComplaint,
    deleteComplaint,
    startTask,
    completeTask
} = require("../controllers/complaintController");

router.get("/create", verifyToken, getComplaintForm);
router.post("/create", verifyToken, createComplaint);
router.get("/my-complaints", verifyToken, getMyComplaints);
router.get("/:id/edit", verifyToken, editComplaintPage);
router.post("/:id/edit", verifyToken, updateComplaint);
router.post("/:id/delete", verifyToken, deleteComplaint);
router.post("/:id/start", verifyToken, verifyWorker, startTask);
router.post("/:id/complete", verifyToken, verifyWorker, completeTask);
router.get("/:id", verifyToken, getComplaintById);
module.exports = router;