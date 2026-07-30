const bcrypt = require("bcrypt");

const User = require("../models/User");

const jwt = require("jsonwebtoken");

async function registerUser(req,res){
    try{
        const {name, email, password} = req.body;

        const existingUser = await User.findOne({
            email
        });

        if(existingUser){
            return res.status(400).json({
                message:"Email Already Exists!"
            });
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        return res.status(201).json({
            message:"User registered successfully!"
        });
    }
    catch (error){

        console.error(error);

        return res.status(500).json({
            message:"Internal Server Error"
        });
    }
}

async function loginUser(req,res){
    try{
        const {email,password} = req.body;

    const user = await User.findOne({
        email
    });

    if(!user){
        return res.status(401).json({
            message:"Incorrect email or password"
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return res.status(401).json({
            message: "Incorrect email or password"
        });
    }


    const token = jwt.sign (
        {
            userId: user._id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );

    return res.status(200).json({
        message: "Login successful",
        token
    });
    }

    catch(error){
        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }

}

module.exports = {
    registerUser,
    loginUser
};