const express = require("express");

const app = express();
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



app.use(express.json());

app.post("/applications", (req, res) => {

    applications.push(req.body);

    res.send("Application added successfully!");

});

app.get("/applications/:id", (req, res) => {

    const id = Number(req.params.id);

    const application = applications.find(
        application => application.id === id
    );

    if (!application) {
        return res.status(404).send("Application not found");
    }


    res.send(application);

});

app.put("/applications/:id", (req, res) => {
    const id = Number(req.params.id);

    const application = applications.find(
        application => application.id === id
    );
    if (!application) {
        return res.status(404).send("Application not found");
    }
    application.status = req.body.status;
    res.send(applications);
})

app.delete("/applications/:id", (req, res) => {

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

app.get("/applications", (req, res) => {
    res.send(applications);
});
app.listen(3000, () => {
    console.log("Server running");
});