const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    company: String,
    role: String,
    status: String,
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