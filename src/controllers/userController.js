const bcrypt = require("bcrypt");

const User = require("../models/User");

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

        res.status(201).json({
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

module.exports = {
    registerUser
};