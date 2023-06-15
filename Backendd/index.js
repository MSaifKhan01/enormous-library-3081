const express = require("express");
const { userRegister } = require("./Router/Signup");
const { userrouter } = require("./Router/login&logout");
const cookieParser = require('cookie-parser');
const { sequelize } = require("./connection/connection");
const { AppointmentModle } = require("./Model/Appointment");
const { DoctorModel } = require("./Model/Doctor");
const { AvailabilityModel } = require("./Model/Availability");

const app = express();
app.use(express.json());

app.use(express.json())
app.use(cookieParser());
// app.use(auth);
app.use("/user", userRegister); // for Register
app.use("/user", userrouter ); // login & logout


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