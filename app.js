const express = require("express");
const dashboardRoutes = require("./routes/dashboardRoutes");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const app = express();


app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));
app.use("/dashboard", dashboardRoutes);
app.get("/", (req, res) => {
    res.send("Welcome to AASHRAY");
});

app.use("/auth", authRoutes);

module.exports = app;