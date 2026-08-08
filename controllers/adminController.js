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
        .sort({ createdAt: -1 })
        .limit(10);

    res.render("admin/dashboard", {
        total,
        pending,
        inProgress,
        resolved,
        complaints
    });

};

module.exports = {
    getAdminDashboard
};