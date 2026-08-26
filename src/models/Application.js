const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({

    company: String,

    role: String,

    status: String,

    statusHistory: [
        {
            status: String,

            changedAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    interviews: [
        {
            date: {
                type: Date,
                required: true
            },

            round: {
                type: String,
                required: true
            },

            type: {
                type: String,
                enum: [
                    "Online",
                    "Offline",
                    "Phone"
                ],
                default: "Online"
            },

            notes: {
                type: String,
                default: ""
            },

            outcome: {
                type: String,
                enum: [
                    "Pending",
                    "Passed",
                    "Failed"
                ],
                default: "Pending"
            }
        }
    ],

    notes: {
        type: String,
        default: ""
    },

    followUpDate: {
        type: Date,
        default: null
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    resume: {
        type: String,
        default: null
    }

}, {
    timestamps: true
});

const Application = mongoose.model(
    "Application",
    applicationSchema
);

module.exports = Application;