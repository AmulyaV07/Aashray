const express = require("express");

const router = express.Router();

const {
    loginPage,
    registerPage,
    registerUser,
    loginUser,
    logoutUser
} = require("../controllers/authController");

router.get("/login", loginPage);

router.get("/register", registerPage);

router.post("/register", registerUser);

router.post("/login", loginUser);
router.get("/logout", logoutUser);
module.exports = router;