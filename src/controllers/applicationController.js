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

function getApplications(req, res) {
    res.json(applications);
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

    res.json(application);
}

async function createApplication(req, res) {

    const application = await Application.create(req.body);

    res.status(201).json({
        message: "Application added successfully!",
        data: application
    });

}

function updateApplication(req, res) {
    const id = Number(req.params.id);

    const application = applications.find(
        application => application.id === id
    );

    if (!application) {
        return res.status(404).json({
            message: "Application not found"
        });
    }

    application.status = req.body.status;

    res.json(application);
}

function deleteApplication(req, res) {
    const id = Number(req.params.id);

    const index = applications.findIndex(
        application => application.id === id
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Application not found"
        });
    }

    applications.splice(index, 1);

    res.json({
        message: "Application deleted successfully!"
    });
}

module.exports = {
    getApplications,
    getApplicationById,
    createApplication,
    updateApplication,
    deleteApplication
};