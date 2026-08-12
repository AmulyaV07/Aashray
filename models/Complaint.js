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


    // Student who raised the complaint

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },


    // Worker assigned to the complaint

    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },


    // When the complaint was assigned to a worker

    assignedAt: {
        type: Date,
        default: null
    },


    // When the worker started working on it

    startedAt: {
        type: Date,
        default: null
    },


    // When the worker completed the task

    resolvedAt: {
        type: Date,
        default: null
    }

}, {

    timestamps: true

});


module.exports = mongoose.model(
    "Complaint",
    complaintSchema
);