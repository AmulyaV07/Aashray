const Complaint = require("../models/Complaint");
const User = require("../models/User");
const getDashboard = async (req, res) => {
    const currentUser = await User.findById(req.user.id);
    const pending = await Complaint.countDocuments({
        user: req.user.id,
        status: "Pending"
    });

    const inProgress = await Complaint.countDocuments({
        user: req.user.id,
        status: "In Progress"
    });

    const resolved = await Complaint.countDocuments({
        user: req.user.id,
        status: "Resolved"
    });

    const recentComplaints = await Complaint
        .find({ user: req.user.id })
        .sort({ createdAt: -1 })
        .limit(5);

    res.render("dashboard", {
    user: currentUser,
    pending,
    inProgress,
    resolved,
    recentComplaints
});

};

module.exports = {
    getDashboard
};