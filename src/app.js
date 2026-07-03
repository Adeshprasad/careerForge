const express = require("express");

const app = express();
const applications = [
    {
        company: "Amazon",
        status: "Applied"
    },
    {
        company: "Google",
        status: "Interview"
    }
];

app.use(express.json());

app.post("/applications", (req, res) => {

    console.log(req.body);
    res.send("Application received!");

});

app.get("/applications", (req,res) => {
    res.send(applications);
});
app.listen(3000, () => {
    console.log("Server running");
});