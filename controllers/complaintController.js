const Complaint = require("../models/Complaint");
const User = require("../models/User");
const createComplaint = async (req, res) => {

    const { title, description, category, roomNumber } = req.body;

    let department = category;

    if (category === "Plumbing") {
        department = "Plumbing";
    }
    else if (category === "Electrical") {
        department = "Electrical";
    }
    else if (category === "Cleaning") {
        department = "Cleaning";
    }
    else if (category === "Internet") {
        department = "Internet";
    }

    const worker = await User.findOne({
        role: "worker",
        department: department
    });

    const complaint = await Complaint.create({
        title,
        description,
        category,
        roomNumber,
        user: req.user.id,
        assignedTo: worker ? worker._id : null
    });

    res.redirect("/dashboard");

};
const getComplaintForm = (req, res) => {
    res.render("complaints/create");
};
const getMyComplaints = async (req, res) => {

    const complaints = await Complaint.find({
        user: req.user.id
    });

    res.render("complaints/myComplaints", {
        complaints
    });

};
const getComplaintById = async (req, res) => {

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
        return res.send("Complaint not found");
    }

    if (complaint.user.toString() !== req.user.id) {
        return res.send("Unauthorized");
    }

    res.render("complaints/details", {
        complaint
    });

};

const editComplaintPage = async (req, res) => {

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
        return res.send("Complaint not found");
    }

    if (complaint.user.toString() !== req.user.id) {
        return res.send("Unauthorized");
    }

    if (complaint.status !== "Pending") {
        return res.send("Only pending complaints can be edited.");
    }

    res.render("complaints/edit", {
        complaint
    });

};
const updateComplaint = async (req, res) => {

    const { title, description, category, roomNumber } = req.body;

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
        return res.send("Complaint not found");
    }

    if (complaint.status !== "Pending") {
        return res.send("Only pending complaints can be edited.");
    }

    await Complaint.findByIdAndUpdate(req.params.id, {
        title,
        description,
        category,
        roomNumber
    });

    res.redirect("/complaints/my-complaints");

};

const deleteComplaint = async (req, res) => {

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
        return res.send("Complaint not found");
    }

    if (complaint.user.toString() !== req.user.id) {
        return res.send("Unauthorized");
    }

    if (complaint.status !== "Pending") {
        return res.send("Only pending complaints can be cancelled.");
    }

    await Complaint.findByIdAndDelete(req.params.id);

    res.redirect("/complaints/my-complaints");
};
const startTask = async (req, res) => {

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
        return res.send("Complaint not found");
    }

    if (!complaint.assignedTo) {
        return res.send("No worker assigned");
    }

    if (complaint.assignedTo.toString() !== req.user.id) {
        return res.send("Unauthorized");
    }

    if (complaint.status !== "Pending") {
        return res.send("Task cannot be started.");
    }

    complaint.status = "In Progress";

    await complaint.save();

    res.redirect("/worker");
};


const completeTask = async (req, res) => {

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
        return res.send("Complaint not found");
    }

    if (!complaint.assignedTo) {
        return res.send("No worker assigned");
    }

    if (complaint.assignedTo.toString() !== req.user.id) {
        return res.send("Unauthorized");
    }

    if (complaint.status !== "In Progress") {
        return res.send("Task must be in progress first.");
    }

    complaint.status = "Resolved";

    await complaint.save();

    res.redirect("/worker");
};

module.exports = {
    getComplaintForm,
    createComplaint,
    getMyComplaints,
    getComplaintById,
    editComplaintPage,
    updateComplaint,
    deleteComplaint,
    startTask,
    completeTask
};