const express = require("express");

const router = express.Router();

const verifyToken = require("../middlewares/authMiddleware");
const verifyAdmin = require("../middlewares/adminMiddleware");

const {
    getAdminDashboard,
    getAddWorkerPage,
    createWorker
} = require("../controllers/adminController");

router.get("/", verifyToken, verifyAdmin, getAdminDashboard);
router.get("/workers/add", verifyToken, verifyAdmin, getAddWorkerPage);
router.post("/workers", verifyToken, verifyAdmin, createWorker);

module.exports = router;