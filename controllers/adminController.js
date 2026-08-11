const User = require("../models/User");
const bcrypt = require("bcrypt");
const Feedback = require("../models/Feedback");
const getAddWorkerPage = (req, res) => {
    res.render("admin/addWorker");
};
const Complaint = require("../models/Complaint");

const getAdminDashboard = async (req, res) => {

    const total = await Complaint.countDocuments();

    const pending = await Complaint.countDocuments({
        status: "Pending"
    });

    const inProgress = await Complaint.countDocuments({
        status: "In Progress"
    });

    const resolved = await Complaint.countDocuments({
        status: "Resolved"
    });

    const complaints = await Complaint
    .find()
    .populate("user")
    .populate("assignedTo")
    .sort({ createdAt: -1 })
    .limit(10);


    const feedbacks = await Feedback.find()
    .populate("complaint")
    .populate("student");
     
    const ratingData = await Feedback.aggregate([
    {
        $group: {
            _id: null,
            averageRating: { $avg: "$rating" }
        }
    }
    ]);

const averageRating = ratingData.length
    ? ratingData[0].averageRating.toFixed(1)
    : "0.0";

    res.render("admin/dashboard", {
        total,
        pending,
        inProgress,
        resolved,
        complaints,
        feedbacks,
        averageRating
    });

};
const createWorker = async (req, res) => {

    try {

        const { name, email, password, department } = req.body;

        if (!name || !email || !password || !department) {
            return res.send("All fields are required");
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.send("Email already registered");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword,
            role: "worker",
            department
        });

        res.send(`
            <script>
                alert("Worker created successfully!");
                window.location.href = "/admin";
            </script>
        `);

    } catch (error) {

        console.log(error);

        res.send("Something went wrong");

    }

};

module.exports = {
    getAdminDashboard,
    getAddWorkerPage,
    createWorker
};