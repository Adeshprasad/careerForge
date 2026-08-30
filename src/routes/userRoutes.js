const express = require("express");

const router = express.Router();

const {
    registerUser,
    loginUser,
    getCurrentUser
} = require("../controllers/userController");

const {
    validateRegister,
    validateLogin
} = require("../middleware/validation/userValidation");

const authMiddleware = require("../middleware/authMiddleware");


router.post(
    "/register",
    validateRegister,
    registerUser
);


router.post(
    "/login",
    validateLogin,
    loginUser
);


router.get(
    "/me",
    authMiddleware,
    getCurrentUser
);


module.exports = router;