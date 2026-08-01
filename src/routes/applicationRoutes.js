const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    getApplications,
    getApplicationById,
    createApplication,
    updateApplication,
    deleteApplication
} = require("../controllers/applicationController");

const {
    validateApplication
} = require("../middleware/validation/applicationValidation");

router.get("/", authMiddleware, getApplications);

router.get("/:id", authMiddleware, getApplicationById);

router.post("/", authMiddleware,validateApplication, createApplication);

router.patch("/:id", authMiddleware,validateApplication, updateApplication);

router.delete("/:id", authMiddleware, deleteApplication);

module.exports = router;