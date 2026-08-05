const express = require("express");

const router = express.Router();

const verifyToken = require("../middlewares/authMiddleware");

const { dashboard } = require("../controllers/dashboardController");

router.get("/", verifyToken, dashboard);

module.exports = router;