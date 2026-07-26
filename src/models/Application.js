const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    company: String,
    status: String
});

const Application = mongoose.model(
    "Application",
    applicationSchema
);

module.exports = Application;