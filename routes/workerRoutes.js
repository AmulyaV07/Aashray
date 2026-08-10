const express = require("express");

const router = express.Router();

const verifyToken = require("../middlewares/authMiddleware");
const verifyWorker = require("../middlewares/workerMiddleware");

const {
    getWorkerDashboard
} = require("../controllers/workerController");


router.get(
    "/",
    verifyToken,
    verifyWorker,
    getWorkerDashboard
);


module.exports = router;