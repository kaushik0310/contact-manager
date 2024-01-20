const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    username:{
        type: "String",
        required: [true, "please enter the username"]
    },

    email:{
        type: "String",
        required: [true, "please enter the user email"]
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