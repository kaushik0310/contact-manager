const bcrypt = require('bcrypt');
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel")
//const validator = require("validator") 

//@desc register user
//@route POST/api/users/register
//@access public

const registerUser =asyncHandler( async(req,res)=>{
    const{username, email, password} = req.body;
    if(!username || !email || !password) {
        res.status(400);
        throw new Error("all fields are mandatory");
    }
  const  userAvailable =await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("user already registered");
    }
// hashing the password 
const hashedPassword = await bcrypt.hash(password, 10);
console.log("Hashed Password: ", hashedPassword);
    const user =await User.create({
        username,
        email, 
        password: hashedPassword,
    })
console.log("registered user is :", user);

if(user){
    res.status(201).json({_id: user._id, mail: user.email});
    //res.json({message: "Register the user"});
}else
    res.status(400);
    throw new Error("User data is not valid");
    //res.json({message: "Register the user"});
   //user is not valid ,this validation is not working
}); 

//@desc login user
//route POST/api/users/login
//access public
const loginUser =asyncHandler( async(req,res)=>{
    const{email,password} = req.body;
if(!email || !password){
   res.status(400);
   throw new Error("All fields are mandatory");
}
   const user = await User.findOne({email})
   //compare password with hashed password
   if(user && (await bcrypt.compare(password,user.password)))
   {
    //   const accessToken=jwt.sign({id:user.id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"7d"})
    //   res.status(200).json({accessToken,user})

    const accessToken = jwt.sign({
        id1: user.email
        //id1:user._id
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "7d"}
                                 );

    res.status(200).json({token:accessToken,user})

   }
   else{
        res.status(401);
        throw new Error("Email or password is not valid")
   }
});

//@desc current user
//@route  GET/api/user/current
//@access private

const currentUser = asyncHandler( async (req,res)=>{
    res.json(req.user);
}
);

module.exports = {registerUser,loginUser,currentUser};
