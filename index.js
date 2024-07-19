const express=require('express');
const app=express();
const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(cookieParser());
const db=require("./config/dbConnect");
const userRouter = require('./Routes/registerUserRoute');
require('dotenv').config();
const PORT=8000;
db.connect();
app.use('/api/v1/users',userRouter)
app.listen(PORT,(req,res)=>{
    console.log(`App is listening at ${PORT}`)
})
app.get("/",(req,res)=>{
    console.log("App is running at your Website")
})