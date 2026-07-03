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

app.get("/applications", (req,res) => {
    res.send(applications);
});
app.listen(3000, () => {
    console.log("Server running");
});