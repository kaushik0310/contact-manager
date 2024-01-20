const mongoose = require("mongoose");

const connectDb = async () =>{
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(
            "Database connected: ",
            connect.connection.host,
            connect.connection.name
        );
        
    } catch (error) {
        console.log(err);
        process.exit(1);
    }
};

 module.exports = connectDb;

// const mongoose = require("mongoose");

// //connect database
// const connectDb = () => {
//     mongoose.connect(process.env.CONNECTION_STRING).then((data) => {
//      console.log(`MongoDB is connected with ${data.connection.host}`);
// });
//  };

//  module.exports = connectDb;