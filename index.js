const express=require('express');
const app=express();
const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(cookieParser());
const db=require("./config/dbConnect");
const userRouter = require('./Routes/registerUserRoute');
const adminRouter = require('./Routes/adminRoutes/adminRoute');
const masterRouter = require('./Routes/masterRoute/masterRoute');
require('dotenv').config();
const PORT=8000;
db.connect();
app.use('/api/v1/users',userRouter)
app.use('/api/v1/admin',adminRouter)
app.use('/api/v1/master',masterRouter)
app.listen(PORT,(req,res)=>{
    console.log(`App is listening at ${PORT}`)
})
app.get("/",(req,res)=>{
    console.log("App is running at your Website")
})