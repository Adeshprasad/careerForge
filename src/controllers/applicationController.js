const Application = require("../models/Application");

const applications = [
    {
        id: 1,
        company: "Amazon",
        status: "Applied"
    },
    {
        id: 2,
        company: "Google",
        status: "Interview"
    }
];

async function getApplications(req, res) {
    try {
        const applications = await Application.find({
            user: req.user.userId
        });

        return res.json({
            message: "Applications fetched successfully!",
            data: applications
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

function getApplicationById(req, res) {
    const id = Number(req.params.id);

    const application = applications.find(
        application => application.id === id
    );

    if (!application) {
        return res.status(404).json({
            message: "Application not found"
        });
    }

    return res.json(application);
}

async function createApplication(req, res) {
    try {
        const application = await Application.create({
            ...req.body,
            user: req.user.userId
        });

        return res.status(201).json({
            message: "Application added successfully!",
            data: application
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

async function updateApplication(req, res) {
    try {

        const application = await Application.findOne({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            });
        }

        Object.assign(application, req.body);

        await application.save();

        return res.json({
            message: "Application Updated Successfully",
            data: application
        });

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

async function deleteApplication(req, res) {
    try {

        const application = await Application.findOneAndDelete({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            });
        }

        return res.status(200).json({
            message: "Application deleted"
        });

    }
    catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

module.exports = {
    getApplications,
    getApplicationById,
    createApplication,
    updateApplication,
    deleteApplication
};