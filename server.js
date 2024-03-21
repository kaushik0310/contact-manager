const express = require("express");
const errorHandler = require("./middleware/errorHandler");
//const mongoose = require("mongoose");
const connectDb = require("./DB/dbConnection");
const dotenv = require("dotenv").config();

connectDb();
const app = express();


const port =process.env.PORT || 4001;

app.use(express.json());
app.use(("/api/contacts"), require("./routes/contactRoutes"));
app.use(("/api/users"), require("./routes/userRoutes"));
app.use(errorHandler);


app.listen(port,()=>{
    console.log(`port connected to the server ${port}`);
    // const token = "Bearer absvhdgfk j1262 kkj";
    // const result = token.split(" ")[3];
    // console.log(result);

})