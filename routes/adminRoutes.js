const express = require("express");

const router = express.Router();

const verifyToken = require("../middlewares/authMiddleware");
const verifyAdmin = require("../middlewares/adminMiddleware");

const {
    getAdminDashboard,
    getAddWorkerPage,
    createWorker,
    getWorkers,
    getEditWorkerPage,
    updateWorker,
    toggleWorkerStatus
} = require("../controllers/adminController");

router.get("/", verifyToken, verifyAdmin, getAdminDashboard);
router.get("/workers/add", verifyToken, verifyAdmin, getAddWorkerPage);
router.post("/workers", verifyToken, verifyAdmin, createWorker);
router.get("/workers", verifyToken, verifyAdmin, getWorkers);
router.get("/workers/:id/edit", verifyToken, verifyAdmin, getEditWorkerPage);
router.post("/workers/:id/edit", verifyToken, verifyAdmin, updateWorker);
router.post("/workers/:id/toggle-status", verifyToken, verifyAdmin, toggleWorkerStatus);
module.exports = router;