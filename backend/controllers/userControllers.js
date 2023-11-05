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
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)   //we generate a jwt on successful registration. This means that the user does not have to login again after registering his account. If we did not generate the jwt on registration and only generated a jwt on login, the user would have had to login again after successful registration.
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
    if(user && (await bcrypt.compare(password, user.password)))   //compare the password which the user entered, to the hashed password in the database.
    {
        return res.status(200).json({
            message: "Logged In successfully!",
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
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

//Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {   //the userId is sent in as the payload. We can send in multiple payload fields by writing into the object (first argument of the sign() method)
        expiresIn: "30d"
    });
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}