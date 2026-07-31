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

router.get("/", authMiddleware, getApplications);

router.get("/:id", authMiddleware, getApplicationById);

router.post("/", authMiddleware, createApplication);

router.patch("/:id", authMiddleware, updateApplication);

router.delete("/:id", authMiddleware, deleteApplication);

module.exports = router;