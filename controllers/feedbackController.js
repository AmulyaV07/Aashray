const Feedback = require("../models/Feedback");
const Complaint = require("../models/Complaint");


const getFeedbackForm = async (req, res) => {

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
        return res.send("Complaint not found");
    }

    if (complaint.user.toString() !== req.user.id) {
        return res.send("Unauthorized");
    }

    if (complaint.status !== "Resolved") {
        return res.send(
            "Feedback is available only after the complaint is resolved."
        );
    }

    const existingFeedback = await Feedback.findOne({
        complaint: complaint._id
    });

    if (existingFeedback) {
        return res.send("Feedback already submitted.");
    }

    res.render("feedback/create", {
        complaint
    });

};


const submitFeedback = async (req, res) => {

    const { rating, comment } = req.body;

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
        return res.send("Complaint not found");
    }

    if (complaint.user.toString() !== req.user.id) {
        return res.send("Unauthorized");
    }

    if (complaint.status !== "Resolved") {
        return res.send(
            "Feedback can only be submitted after the complaint is resolved."
        );
    }

    const existingFeedback = await Feedback.findOne({
        complaint: complaint._id
    });

    if (existingFeedback) {
        return res.send("Feedback already submitted.");
    }

    await Feedback.create({
        complaint: complaint._id,
        student: req.user.id,
        rating,
        comment
    });

    res.send("Feedback submitted successfully!");

};


module.exports = {
    getFeedbackForm,
    submitFeedback
};