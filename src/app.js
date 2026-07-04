const express = require("express");

const app = express();

const applicationRouter = require("./routes/applicationRoutes");

// Global Middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Authentication Middleware
app.use("/profile", (req, res, next) => {
    if (req.query.admin === "true") {
        next();
    } else {
        res.status(401).json({
            message: "Access denied"
        });
    }
});

// Mount Router
app.use("/applications", applicationRouter);

// Other Routes
app.get("/profile", (req, res) => {
    res.json({
        message: "Welcome to your profile!"
    });
});

// Root Route
app.get("/", (req, res) => {
    res.send("Welcome to CareerForge API!");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});