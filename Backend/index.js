const express = require("express");
const cors = require('cors')
const { userRegister } = require("./Router/Signup");
const { userrouter } = require("./Router/login&logout");
const OauthRouter=require('./middleware/Oauth')
const cookieParser = require('cookie-parser');
const { sequelize } = require("./connection/connection");
const { AdminRouter } = require("./Router/AdminLogin&Logout&Signup");
const { AppointmentModle } = require("./Model/Appointment");
const { DoctorModel } = require("./Model/Doctor");
const { AvailabilityModel } = require("./Model/Availability");
const { Doctor } = require("./Router/DoctorRoute");
const { UserRouter } = require("./Router/User");
const AppointmentRoute = require("./Router/Appointment");

const app = express();
app.use(cors())  // used for fetch data in frontend
app.use(cookieParser());
app.use(express.json())


app.get("/login",(req,res)=>{
    res.sendFile(__dirname+"/index.html")  
})


app.use("/auth",OauthRouter)

app.use("/user", userRegister); // for Register
app.use("/user", userrouter ); // login & logout
// app.use("/auth",OauthRouter)  // Only use this Auth after login Route
// app.use(auth);                // Only use this Auth after login Route
app.use("/admin", AdminRouter);
app.use("/user",UserRouter)
app.use("/doctor",Doctor);
app.use("/appointment",AppointmentRoute)

sequelize.sync().then(()=>{
    app.listen(3000,async()=>{
        try {
            await sequelize.authenticate();
            console.log("server is running in port 3000")
        } catch (error) {
            console.log(error);
        }
    })
})