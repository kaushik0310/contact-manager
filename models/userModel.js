const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({

    username:{
        type: "String",
        required: [true, "please enter the username"]
    },

    email:{
        type: "String",
        required: [true, "please enter the user email"],
        validate: [validator.isEmail, "Please Enter a valid Email"]
    },

    password:{
        type: "String",
        required: [true, "please enter the user password"]
    },
},
{
    timestamps: true,
}
)

module.exports= mongoose.model("User", userSchema);