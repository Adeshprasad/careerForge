const express = require("express");

const router = express.Router();

// Temporary in-memory data
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

// GET /applications
router.get("/", (req, res) => {
    res.send(applications);
});

// POST /applications
router.post("/", (req, res) => {
    applications.push(req.body);

    res.send("Application added successfully!");
});

// GET /applications/:id
router.get("/:id", (req, res) => {
    const id = Number(req.params.id);

    const application = applications.find(
        application => application.id === id
    );

    if (!application) {
        return res.status(404).send("Application not found");
    }

    res.send(application);
});

// PUT /applications/:id
router.put("/:id", (req, res) => {
    const id = Number(req.params.id);

    const application = applications.find(
        application => application.id === id
    );

    if (!application) {
        return res.status(404).send("Application not found");
    }

    application.status = req.body.status;

    res.send(application);
});

// DELETE /applications/:id
router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = applications.findIndex(
        application => application.id === id
    );

    if (index === -1) {
        return res.status(404).send("Application not found");
    }

    applications.splice(index, 1);

    res.send("Application deleted successfully!");
});

module.exports = router;