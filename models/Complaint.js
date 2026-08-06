const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    roomNumber: {
        type: String,
        required: true
    },

    status: {
        type: String,
        default: "Pending"
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model("Complaint", complaintSchema);