const express = require("express");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.get("/", (req, res) => {
    res.send("Welcome to AASHRAY");
});

app.use("/auth", authRoutes);

module.exports = app;
