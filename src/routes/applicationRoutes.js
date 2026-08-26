const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    getApplications,
    getApplicationById,
    createApplication,
    updateApplication,
    deleteApplication,
    getResume,
    getApplicationAnalytics,
    getUpcomingFollowUps,
    addInterview,
    updateInterview,
    deleteInterview
} = require("../controllers/applicationController");

const {
    validateApplication
} = require("../middleware/validation/applicationValidation");

const upload = require("../middleware/uploadMiddleware");

router.get(
    "/",
    authMiddleware,
    getApplications
);

router.get(
    "/:id/resume",
    authMiddleware,
    getResume
);

router.get(
    "/analytics",
    authMiddleware,
    getApplicationAnalytics
);

router.get(
    "/follow-ups",
    authMiddleware,
    getUpcomingFollowUps
);

router.post(
    "/:id/interviews",
    authMiddleware,
    addInterview
);

router.patch(
    "/:id/interviews/:interviewId",
    authMiddleware,
    updateInterview
);

router.delete(
    "/:id/interviews/:interviewId",
    authMiddleware,
    deleteInterview
);

router.get(
    "/:id",
    authMiddleware,
    getApplicationById
);

router.post(
    "/",
    authMiddleware,
    upload.single("resume"),
    validateApplication,
    createApplication
);

router.patch(
    "/:id",
    authMiddleware,
    upload.single("resume"),
    validateApplication,
    updateApplication
);

router.delete(
    "/:id",
    authMiddleware,
    deleteApplication
);

module.exports = router;