const Complaint = require("../models/Complaint");
const getWorkerDashboard = async (req, res) => {

    const tasks = await Complaint.find({
        assignedTo: req.user.id
    })
    .populate("user")
    .sort({ createdAt: -1 });

    res.render("worker/dashboard", {
        user: req.user,
        tasks
    });

};
module.exports = {
    getWorkerDashboard
};