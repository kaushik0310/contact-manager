const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken")
const User=require("../models/userModel")

const validateToken = asyncHandler(async (req,res,next)=>{
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        console.log("token is :",token);
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,async(err, decoded)=>{
            if (err) {
                res.status(401);
                throw new Error("User is not authorized");
            }
           // const user=await User.findById(decoded.id1)
            const email1=decoded.id1
        //    console.log("decoded payload is", decoded)
          const user=await User.findOne({email:email1})
            req.user1=user
           //req.user1=decoded.id1
            
            
            next();
        });
        if(!token){
            res.status(401);
            throw new Error("User is not authorized or token is missing");
        }
    }
} 
);
module.exports = validateToken;