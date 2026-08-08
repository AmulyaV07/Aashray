const express = require("express");

const router = express.Router();

const verifyToken = require("../middlewares/authMiddleware");
const verifyAdmin = require("../middlewares/adminMiddleware");

const {
    getAdminDashboard
} = require("../controllers/adminController");

router.get("/", verifyToken, verifyAdmin, getAdminDashboard);

module.exports = router;