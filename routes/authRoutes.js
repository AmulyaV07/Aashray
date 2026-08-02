const express = require("express");

const router = express.Router();

const { registerUser } = require("../controllers/authController");

router.get("/login", (req, res) => {
    res.send("Login Page");
});

router.get("/register", registerUser);

module.exports = router;