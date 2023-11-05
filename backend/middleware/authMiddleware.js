const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protectRoutes = asyncHandler(async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))   //check if authorization header exist && the authorization header is of the format: "Bearer tokenString"
    {
        try {
            token = req.headers.authorization.split(" ")[1];   //Get token from the request header. The token in the header is present in the following format: "Bearer tokenString". So we extract the tokenString using the split() method.
    
            const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);   //Verify token. This method does the same thing the jwt.io website does. It takes the jwt token from the request header and matches it with the secret key that we have kept in the .env file.
        
            req.user = await User.findById(decodedPayload.id).select("-password");   //Get user from the token. This is done by getting the "user id" from the token, as the userId is already present as a payload on the token. The select() method specifies which attribute in the user collection/table do we want to exclude, here we exclude the "password" attribute from getting sent to req.user. Hence, we can know which user has logged in and is accessing a specific route/endpoint.
            
            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error("Not Authorized!");
        }
    }
    
    if(!token)
    {
        res.status(401);
        throw new Error("Not Authorized, No token!")
    }
});

module.exports = { protectRoutes };