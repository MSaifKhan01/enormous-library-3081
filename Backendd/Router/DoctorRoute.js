const express = require("express");
const { User } = require("../Model/User");
const { DoctorModel } = require("../Model/Doctor");
const doctorRegister = express.Router();

const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   service: "",
//   auth: {
//     user: "",
//     pass: "",
//   },
// });

// doctor can apply using this application and only admin can Approve ;
doctorRegister.post("/register", async (req, res) => {
  const {
    name,
    email,
    Gender,
    City,
    State,
    Language,
    Experience,
    Degree,
    Specialty,
  } = req.body;
  try {
    const isDoctorPresent = await DoctorModel.findOne({
      where: { email },
    });
    if (isDoctorPresent) {
      return res.status(409).send({ msg: "Doctor already exists" });
    }
    const newDoctor = await DoctorModel.create({
      name,
      email,
      Gender,
      City,
      State,
      Language,
      Experience,
      Degree,
      Specialty,
    });
    res.status(200).send({
      msg: "Doctor registration successful. Awaiting admin approval.",
      newDoctor,
    });
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
});

//   !! Admin Only Access !!

doctorRegister.put("/approve/:doctorId", async (req, res) => {
  const doctorId = req.params.doctorId;
  try {
    const doctor = await DoctorModel.findByPk(doctorId);
    if (!doctor) {
      return res.status(404).send({ msg: "Doctor not found" });
    }
    doctor.approved = true;
    await doctor.save();

    // Send approval email to the doctor
    const mailOptions = {
      from: "darkphinixgamer@gmail.com",
      to: doctor.email,
      subject: "Doctor Approval",
      text: "Congratulations! You have been approved as a doctor.",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(200).send({ msg: "Doctor approved successfully", doctor });
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
});

module.exports = {
  doctorRegister,
};
