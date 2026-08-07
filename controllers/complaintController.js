const Complaint = require("../models/Complaint");
const createComplaint = async (req, res) => {

    const { title, description, category, roomNumber } = req.body;

    await Complaint.create({
        title,
        description,
        category,
        roomNumber,
        user: req.user.id
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

    res.render("complaints/details", {
        complaint
    });

};

const editComplaintPage = async (req, res) => {

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
        return res.send("Complaint not found");
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

module.exports = {
    getComplaintForm,
    createComplaint,
    getMyComplaints,
    getComplaintById,
    editComplaintPage,
    updateComplaint
};