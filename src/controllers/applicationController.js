const Application = require("../models/Application");
const asyncHandler = require("../utils/asyncHandler");

const getApplications = asyncHandler(async (req, res) => {

    const { status, company, sort, page = 1, limit = 10 } = req.query;

    let query = {
        user: req.user.userId
    };

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    if (status) {
        query.status = status;
    }

    if (company) {
        query.company = new RegExp(company, "i");
    }

    let applicationsQuery = Application.find(query);

    if (sort) {
        applicationsQuery = applicationsQuery.sort(sort);
    }

    applicationsQuery = applicationsQuery
        .skip(skip)
        .limit(limitNumber)
        .populate("user", "name email");

    const applications = await applicationsQuery;

    const totalApplications = await Application.countDocuments(query);
    const totalPages = Math.ceil(totalApplications / limitNumber);

    return res.json({
        message: "Applications fetched successfully!",
        page: pageNumber,
        limit: limitNumber,
        totalApplications,
        totalPages,
        hasNextPage: pageNumber < totalPages,
        hasPreviousPage: pageNumber > 1,
        data: applications
    });
});

const getApplicationById = asyncHandler(async (req, res) => {

    const application = await Application.findOne({
        _id: req.params.id,
        user: req.user.userId
    }).populate("user", "name email");

    if (!application) {
        return res.status(404).json({
            message: "Application not found"
        });
    }

    return res.json({
        message: "Application fetched successfully!",
        data: application
    });
});

const createApplication = asyncHandler(async (req, res) => {

    const application = await Application.create({
        ...req.body,
        user: req.user.userId,
        resume: req.file?.path
    });

    return res.status(201).json({
        message: "Application added successfully!",
        data: application
    });
});

const updateApplication = asyncHandler(async (req, res) => {

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

    if (req.file) {
        application.resume = req.file.path;
    }

    await application.save();

    return res.json({
        message: "Application Updated Successfully",
        data: application
    });
});

const deleteApplication = asyncHandler(async (req, res) => {

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
});

module.exports = {
    getApplications,
    getApplicationById,
    createApplication,
    updateApplication,
    deleteApplication
};