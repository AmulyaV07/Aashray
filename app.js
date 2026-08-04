const express = require("express");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("Welcome to AASHRAY");
});

app.use("/auth", authRoutes);

module.exports = app;