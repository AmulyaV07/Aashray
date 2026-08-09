const express = require("express");
const indexRoutes = require("./routes/indexRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const profileRoutes = require("./routes/profileRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const workerRoutes = require("./routes/workerRoutes");
const cookieParser = require("cookie-parser");
const app = express();


app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));
app.use("/", indexRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/profile", profileRoutes);
app.use("/auth", authRoutes);
app.use("/complaints", complaintRoutes);
app.use("/workers", workerRoutes);
app.use("/admin", adminRoutes);
module.exports = app;