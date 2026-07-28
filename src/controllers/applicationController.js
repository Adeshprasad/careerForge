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

async function getApplications(req,res){
    const applications = await Application.find();

    res.json({
        message:"Applications fetched successfully!",
        data: applications
    });
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

async function updateApplication(req, res) {
    try {
        const application = await Application.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            });
        }

        res.json({
            message: "Application Updated Successfully",
            data: application
        });

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}
 
async function deleteApplication(req,res){
    try{
        const application = await Application.findByIdAndDelete(
        req.params.id
    );

    if(!application){
        return res.status(404).json({
            message:"Application not found"
        });
    }

    res.status(200).json({
            message:"Application deleted"
        });

    }
    catch (error) {
        res.status(500).json({
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