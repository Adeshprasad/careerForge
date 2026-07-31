const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    company: String,
    status: String,
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
}
});

const Application = mongoose.model(
    "Application",
    applicationSchema
);

module.exports = Application;