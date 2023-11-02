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
    else
    {
        return res.status(201).json({ message: "User Registered" });
    }
});

// @desc   Authenticate a user
// @route   POST /api/users/login
// @access   Public
const loginUser = asyncHandler(async (req, res) => {
    return res.status(200).json({ message: "Login User" });
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