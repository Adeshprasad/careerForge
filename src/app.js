const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Home Page");
});

app.get("/profile", (req, res) => {
    res.send("Profile Page");
});

app.get("/applications", (req, res) => {
    res.send("Applications Page");
});

app.listen(3000, () => {
    console.log("Server running");
});