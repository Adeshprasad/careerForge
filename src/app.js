require("dotenv").config(); 

const express = require("express");

const connectDB = require("./config/db");

connectDB();

const app = express();

const applicationRouter = require("./routes/applicationRoutes");

const userRoutes = require("./routes/userRoutes");



// Global Middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use("/uploads", express.static("uploads"));

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

// Routes
app.use("/applications", applicationRouter);

app.get("/", (req, res) => {
    res.send("Welcome to CareerForge API!");
});

app.get("/profile", (req, res) => {
    res.json({
        message: "Welcome to your profile!"
    });
});

app.use("/users", userRoutes);

app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});