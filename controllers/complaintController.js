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

module.exports = {
    getComplaintForm,
    createComplaint,
    getMyComplaints,
    getComplaintById
};