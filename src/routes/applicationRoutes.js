const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    getApplications,
    getApplicationById,
    createApplication,
    updateApplication,
    deleteApplication,
    getResume
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