const express = require("express");

const router = express.Router();

const verifyToken = require("../middlewares/authMiddleware");
const verifyAdmin = require("../middlewares/adminMiddleware");

const {
    getAdminDashboard,
    getAddWorkerPage,
    createWorker,
    getWorkers
} = require("../controllers/adminController");

router.get("/", verifyToken, verifyAdmin, getAdminDashboard);
router.get("/workers/add", verifyToken, verifyAdmin, getAddWorkerPage);
router.post("/workers", verifyToken, verifyAdmin, createWorker);
router.get("/workers", verifyToken, verifyAdmin, getWorkers);
module.exports = router;