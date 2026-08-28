require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

connectDB();

const app = express();

const applicationRouter = require("./routes/applicationRoutes");
const userRoutes = require("./routes/userRoutes");

// CORS Middleware
app.use(
    cors({
        origin: "http://localhost:5173"
    })
);

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

// Error Handling Middleware
app.use((err, req, res, next) => {

    console.error(err);

    if (err.name === "CastError") {
        return res.status(400).json({
            success: false,
            message: "Invalid application ID"
        });
    }

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});