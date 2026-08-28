const mongoose = require("mongoose");
const Application = require("../models/Application");
const asyncHandler = require("../utils/asyncHandler");
const path = require("path");


const getApplications = asyncHandler(async (req, res) => {

    const {
        status,
        company,
        from,
        to,
        sort,
        page = 1,
        limit = 10
    } = req.query;


    let query = {
        user: req.user.userId
    };


    // -----------------------------
    // Pagination validation
    // -----------------------------

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    if (
        isNaN(pageNumber) ||
        pageNumber < 1
    ) {
        return res.status(400).json({
            message: "Page must be a positive number"
        });
    }


    if (
        isNaN(limitNumber) ||
        limitNumber < 1
    ) {
        return res.status(400).json({
            message: "Limit must be a positive number"
        });
    }


    const MAX_LIMIT = 50;

    if (limitNumber > MAX_LIMIT) {
        return res.status(400).json({
            message: `Limit cannot exceed ${MAX_LIMIT}`
        });
    }


    // -----------------------------
    // Date validation
    // -----------------------------

    const fromDate = from
        ? new Date(from)
        : null;

    const toDate = to
        ? new Date(to)
        : null;


    if (
        fromDate &&
        isNaN(fromDate.getTime())
    ) {
        return res.status(400).json({
            message: "Invalid from date"
        });
    }


    if (
        toDate &&
        isNaN(toDate.getTime())
    ) {
        return res.status(400).json({
            message: "Invalid to date"
        });
    }


    if (
        fromDate &&
        toDate &&
        fromDate > toDate
    ) {
        return res.status(400).json({
            message: "From date cannot be after to date"
        });
    }


    const skip =
        (pageNumber - 1) * limitNumber;


    // -----------------------------
    // Status validation
    // -----------------------------

    const allowedStatuses = [
        "Applied",
        "Interview",
        "Rejected",
        "Offer"
    ];


    if (
        status &&
        !allowedStatuses.includes(status)
    ) {
        return res.status(400).json({
            message: "Invalid application status"
        });
    }


    // -----------------------------
    // Sort validation
    // -----------------------------

    const allowedSorts = [
        "createdAt",
        "-createdAt"
    ];


    if (
        sort &&
        !allowedSorts.includes(sort)
    ) {
        return res.status(400).json({
            message: "Invalid sort option"
        });
    }


    // -----------------------------
    // Build query
    // -----------------------------

    if (status) {
        query.status = status;
    }


    if (company) {
        query.company = new RegExp(
            company,
            "i"
        );
    }


    if (fromDate || toDate) {

        query.createdAt = {};

        if (fromDate) {
            query.createdAt.$gte = fromDate;
        }

        if (toDate) {

            const endDate =
                new Date(toDate);

            endDate.setHours(
                23,
                59,
                59,
                999
            );

            query.createdAt.$lte =
                endDate;
        }
    }


    // -----------------------------
    // Fetch applications
    // -----------------------------

    let applicationsQuery =
        Application.find(query);


    if (sort) {
        applicationsQuery =
            applicationsQuery.sort(sort);
    }


    applicationsQuery =
        applicationsQuery
            .skip(skip)
            .limit(limitNumber)
            .populate(
                "user",
                "name email"
            );


    const applications =
        await applicationsQuery;


    const totalApplications =
        await Application.countDocuments(
            query
        );


    const totalPages =
        Math.ceil(
            totalApplications /
            limitNumber
        );


    return res.json({

        message:
            "Applications fetched successfully!",

        page: pageNumber,

        limit: limitNumber,

        totalApplications,

        totalPages,

        hasNextPage:
            pageNumber < totalPages,

        hasPreviousPage:
            pageNumber > 1,

        data: applications
    });
});



const getApplicationAnalytics =
    asyncHandler(async (req, res) => {

        const userId =
            req.user.userId;


        const totalApplications =
            await Application.countDocuments({
                user: userId
            });


        const statusBreakdown =
            await Application.aggregate([

                {
                    $match: {
                        user:
                            new mongoose.Types.ObjectId(
                                userId
                            )
                    }
                },

                {
                    $group: {
                        _id: "$status",

                        count: {
                            $sum: 1
                        }
                    }
                }

            ]);


        return res.json({

            totalApplications,

            statusBreakdown

        });
    });



const getUpcomingFollowUps =
    asyncHandler(async (req, res) => {

        const today =
            new Date();


        today.setHours(
            0,
            0,
            0,
            0
        );


        const applications =
            await Application.find({

                user: req.user.userId,

                followUpDate: {
                    $gte: today
                }

            })
                .sort({
                    followUpDate: 1
                })
                .populate(
                    "user",
                    "name email"
                );


        return res.json({

            message:
                "Upcoming follow-ups fetched successfully!",

            data: applications

        });
    });



const getApplicationById =
    asyncHandler(async (req, res) => {

        const application =
            await Application.findOne({

                _id: req.params.id,

                user: req.user.userId

            })
                .populate(
                    "user",
                    "name email"
                );


        if (!application) {

            return res.status(404).json({

                message:
                    "Application not found"

            });

        }


        return res.json({

            message:
                "Application fetched successfully!",

            data: application

        });
    });



const getResume =
    asyncHandler(async (req, res) => {

        const application =
            await Application.findOne({

                _id: req.params.id,

                user: req.user.userId

            });


        if (!application) {

            return res.status(404).json({

                message:
                    "Application not found"

            });

        }


        if (!application.resume) {

            return res.status(404).json({

                message:
                    "Resume not found"

            });

        }


        const filePath =
            path.resolve(
                application.resume
            );


        return res.sendFile(
            filePath
        );
    });



const createApplication =
    asyncHandler(async (req, res) => {

        const application =
            await Application.create({

                ...req.body,

                user:
                    req.user.userId,

                resume:
                    req.file?.path,

                statusHistory: [

                    {
                        status:
                            req.body.status,

                        changedAt:
                            new Date()
                    }

                ]

            });


        return res.status(201).json({

            message:
                "Application added successfully!",

            data: application

        });
    });



const updateApplication =
    asyncHandler(async (req, res) => {

        const application =
            await Application.findOne({

                _id: req.params.id,

                user: req.user.userId

            });


        if (!application) {

            return res.status(404).json({

                message:
                    "Application not found"

            });

        }


        const oldStatus =
            application.status;


        Object.assign(
            application,
            req.body
        );


        if (req.file) {

            application.resume =
                req.file.path;

        }


        if (
            req.body.status &&
            req.body.status !== oldStatus
        ) {

            if (
                !application.statusHistory
            ) {

                application.statusHistory = [

                    {
                        status:
                            oldStatus,

                        changedAt:
                            application.createdAt ||
                            new Date()
                    }

                ];

            }


            application.statusHistory.push({

                status:
                    req.body.status,

                changedAt:
                    new Date()

            });

        }


        await application.save();


        return res.json({

            message:
                "Application Updated Successfully",

            data: application

        });
    });



const addInterview =
    asyncHandler(async (req, res) => {

        const application =
            await Application.findOne({

                _id: req.params.id,

                user: req.user.userId

            });


        if (!application) {

            return res.status(404).json({

                message:
                    "Application not found"

            });

        }


        const {
            date,
            round,
            type,
            notes,
            outcome
        } = req.body;


        if (!date) {

            return res.status(400).json({

                message:
                    "Interview date is required"

            });

        }


        if (
            !round ||
            !round.trim()
        ) {

            return res.status(400).json({

                message:
                    "Interview round is required"

            });

        }


        application.interviews.push({

            date,

            round,

            type,

            notes,

            outcome

        });


        await application.save();


        return res.status(201).json({

            message:
                "Interview added successfully!",

            data: application

        });
    });



const deleteApplication =
    asyncHandler(async (req, res) => {

        const application =
            await Application.findOneAndDelete({

                _id: req.params.id,

                user: req.user.userId

            });


        if (!application) {

            return res.status(404).json({

                message:
                    "Application not found"

            });

        }


        return res.status(200).json({

            message:
                "Application deleted"

        });
    });



const updateInterview =
    asyncHandler(async (req, res) => {

        const application =
            await Application.findOne({

                _id: req.params.id,

                user: req.user.userId

            });


        if (!application) {

            return res.status(404).json({

                message:
                    "Application not found"

            });

        }


        const interview =
            application.interviews.id(
                req.params.interviewId
            );


        if (!interview) {

            return res.status(404).json({

                message:
                    "Interview not found"

            });

        }


        Object.assign(
            interview,
            req.body
        );


        await application.save();


        return res.json({

            message:
                "Interview updated successfully!",

            data: application

        });
    });



const deleteInterview =
    asyncHandler(async (req, res) => {

        const application =
            await Application.findOne({

                _id: req.params.id,

                user: req.user.userId

            });


        if (!application) {

            return res.status(404).json({

                message:
                    "Application not found"

            });

        }


        const interview =
            application.interviews.id(
                req.params.interviewId
            );


        if (!interview) {

            return res.status(404).json({

                message:
                    "Interview not found"

            });

        }


        interview.deleteOne();


        await application.save();


        return res.json({

            message:
                "Interview deleted successfully!",

            data: application

        });
    });



module.exports = {

    getApplications,

    getApplicationById,

    getResume,

    createApplication,

    updateApplication,

    deleteApplication,

    getApplicationAnalytics,

    getUpcomingFollowUps,

    addInterview,

    updateInterview,

    deleteInterview

};