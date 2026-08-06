const express = require("express");
const indexRoutes = require("./routes/indexRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const authRoutes = require("./routes/authRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const cookieParser = require("cookie-parser");
const app = express();


app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));
app.use("/", indexRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/auth", authRoutes);
app.use("/complaints", complaintRoutes);

module.exports = app;