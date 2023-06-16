const express = require("express");
const { User } = require("../Model/User");
const { DoctorModel } = require("../Model/Doctor");
const { AppointmentModel } = require("../Model/Appointment");
const Doctor = express.Router();

// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   service: "",
//   auth: {
//     user: "",
//     pass: "",
//   },
// });

// doctor can apply using this application and only admin can Approve ;
Doctor.post("/register", async (req, res) => {
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
    Image,
    About,
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
      Image,
      About,
    });
    res.status(200).send({
      msg: "Doctor registration successful. Awaiting admin approval.",
      newDoctor,
    });
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
});

// filter doctor with many filer options : //

Doctor.get("/getDoctors", async (req, res) => {
  try {
    const { name, Gender, City, State, Language, Experience, Degree } =
      req.query; // Get parameters from query string

    let filter = {};

    if (name) {
      filter.name = name;
    }

    if (Gender) {
      filter.Gender = Gender;
    }

    if (City) {
      filter.City = City;
    }

    if (State) {
      filter.State = State;
    }

    if (Language) {
      filter.Language = Language;
    }

    if (Experience) {
      filter.Experience = Experience;
    }

    if (Degree) {
      filter.Degree = Degree;
    }

    const doctors = await DoctorModel.findAll({ where: filter });

    if (!doctors || doctors.length === 0) {
      return res.status(404).send({ msg: "No doctors found" });
    }

    res.status(200).send({
      msg: "Doctors retrieved successfully",
      doctors,
    });
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
});

// doctor can see app the appoints accoceted with him //
Doctor.get("/getAppointments/:doctorId", async (req, res) => {
  const { doctorId } = req.params;
  UserModel.hasMany(AppointmentModel, { foreignKey: "UserID" });
  AppointmentModel.belongsTo(UserModel, { foreignKey: "UserID" });
  try {
    const appointments = await AppointmentModel.findAll({
      where: { doctorId },
      include: [
        {
          model: UserModel,
          required: true,
        },
      ],
    });

    if (!appointments || appointments.length === 0) {
      return res.status(404).send({ msg: "No appointments found" });
    }

    res.status(200).send({
      msg: "Appointments retrieved successfully",
      appointments,
    });
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
});

//   !! Admin Only Access !!

Doctor.put("/approve/:doctorId", async (req, res) => {
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

//  Delete Doctor Information !! Admin Use Only !! //

Doctor.delete("/delete/:doctorId", async (req, res) => {
  const doctorId = req.params.doctorId;
  try {
    const doctor = await DoctorModel.findByPk(doctorId);
    if (!doctor) {
      return res.status(404).send({ msg: "Doctor not found" });
    }

    // Delete the doctor from the database
    await doctor.destroy();

    res.status(200).send({ msg: "Doctor deleted successfully" });
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
});

//  Update Doctor Information !! Admin Use Only !! //
Doctor.put("/update/:doctorId", async (req, res) => {
  const doctorId = req.params.doctorId;
  const {
    name,
    email,
    Gender,
    City,
    State,
    Language,
    Experience,
    Degree,
    image,
    About,
  } = req.body;

  try {
    const doctor = await DoctorModel.findByPk(doctorId);
    if (!doctor) {
      return res.status(404).send({ msg: "Doctor not found" });
    }

    // Update the doctor's information
    doctor.name = name || doctor.name;
    doctor.email = email || doctor.email;
    doctor.Gender = Gender || doctor.Gender;
    doctor.City = City || doctor.City;
    doctor.State = State || doctor.State;
    doctor.Language = Language || doctor.Language;
    doctor.Experience = Experience || doctor.Experience;
    doctor.Degree = Degree || doctor.Degree;
    doctor.image = image || doctor.image;
    doctor.About = About || doctor.About;

    await doctor.save();

    res.status(200).send({ msg: "Doctor updated successfully", doctor });
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
});

module.exports = {
  Doctor,
};
