const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        roomNumber: {
            type: String,
            required: function () {
                return this.role === "student";
            }
        },

        role: {
            type: String,
            enum: ["student", "worker", "admin"],
            default: "student"
        },

        department: {
            type: String,
            enum: [
                "Plumbing",
                "Electrical",
                "Cleaning",
                "Internet",
                "Maintenance"
            ],
            default: null
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;