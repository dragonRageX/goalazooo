const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

// @desc   Register new user
// @route   POST /api/users
// @access   Public
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password)
    {
        res.status(400);
        throw new Error("Please add all fields!");
    }

    const userExists = await User.findOne({ email });   //check if user already exists

    if(userExists)
    {
        res.status(400);
        throw new Error("User already exists!");
    }

    const salt = await bcrypt.genSalt(10);   //hash password
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name: name,
        email: email,
        password: hashedPassword
    });

    if(user)
    {
        return res.status(201).json({
            message: "Registered successfully!",
            data: {
                _id: user.id,
                name: user.name,
                email: user.email
            }
        });
    }
    else
    {
        res.status(400);
        throw new Error("Unsuccessful Registration :(");
    }
});

// @desc   Authenticate a user
// @route   POST /api/users/login
// @access   Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });   //fetch user from database based on the email he entered while logging in
    if(user && (await bcrypt.compare(password, user.password)))
    {
        return res.status(200).json({
            message: "Logged In successfully!",
            data: {
                _id: user.id,
                name: user.name,
                email: user.email
            }
        });
    }
    else
    {
        res.status(400);
        throw new Error("Invalid credentials");
    }
});

// @desc   GET user data
// @route   GET /api/users/me
// @access   Private
const getMe = asyncHandler(async (req, res) => {
    return res.status(200).json({ message: "User Data goes here." });
});

module.exports = {
    registerUser,
    loginUser,
    getMe
}