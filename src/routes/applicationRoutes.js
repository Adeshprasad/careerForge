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

router.get("/", getApplications);

router.get("/:id", getApplicationById);

router.post("/", createApplication);

router.patch("/:id", updateApplication);

router.delete("/:id", deleteApplication);

router.get("/", authMiddleware, getApplications);

router.delete("/:id", authMiddleware, deleteApplication);

module.exports = router;