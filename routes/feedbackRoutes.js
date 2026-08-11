const express = require("express");

const router = express.Router();

const verifyToken = require("../middlewares/authMiddleware");

const {
    getFeedbackForm,
    submitFeedback
} = require("../controllers/feedbackController");


router.get("/:id", verifyToken, getFeedbackForm);
router.post("/:id", verifyToken, submitFeedback);
module.exports = router;