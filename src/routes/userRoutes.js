const express = require("express");

const router = express.Router();

const {
    registerUser,
    loginUser
} = require("../controllers/userController");

const {
    validateRegister,
    validateLogin
} = require("../middleware/validation/userValidation");


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


module.exports = router;