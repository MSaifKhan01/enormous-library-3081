const express = require("express");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require("../Model/User");
const { DoctorModel } = require("../Model/Doctor");
const { AppointmentModel } = require("../Model/Appointment");
const {DoctorlogoutModel}=require("../Model/DoctorLogout")
const auth=require("../middleware/auth")
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
    password,
    Gender,
    City,
    State,
    Language,
    Experience,
    Degree,
    Specialty,
    Image,
    Role,
    About,
  } = req.body;
  try {
    const isDoctorPresent = await DoctorModel.findOne({
      where: { email },
    });
    if (isDoctorPresent) {
      return res.status(409).send({ msg: "Doctor already exists" });
    }
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
          return res.status(500).send({ msg: err.message });
      }
      const newDoctor = await DoctorModel.create({
        name,
        email,
        password:hash,
        Gender,
        City,
        State,
        Language,
        Experience,
        Degree,
        Specialty,
        Image,
        Role,
        About,
      });
      res.status(200).send({ msg: "Registration successful", newDoctor });
  });
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
});



Doctor.post('/login', async (req, res) => {
  const { email, password } = req.body

  const isDoctorPresent = await DoctorModel.findOne({
      where: {
          email
      }
  })

  if (isDoctorPresent) {
      bcrypt.compare(password, isDoctorPresent.password, (err, result) => {
          if (result) {
              const token = jwt.sign({ userID: isDoctorPresent.id }, "jvd", { expiresIn: "1h" })
              res.cookie("token", token, { maxAge: 24 * 60 * 60 });
              console.log(req.cookies.token)
              res.status(200).send({ msg: "login successful", token })
          } else {
              return res.send({ msg: "wrong credentials" })
          }
      })
  } else {
      return res.status(404).send({ msg: "Not registered need to registration" })
  }
});


Doctor.post('/logout', async (req, res) => {
  const token = req.cookies.token;
  console.log("********************************************************");
  console.log(token);
  console.log("********************************************************");
  if (!token) {
      return res.status(400).send({ msg: 'No token provided' });
  }
  try {
      const isTokenBlacklisted = await DoctorlogoutModel.findOne({
          where: { token }
      });
      if (!isTokenBlacklisted) {
          await DoctorlogoutModel.create({ token });
          res.clearCookie('token');
          res.status(200).send({ msg: 'Logout successful' });
      } else {
          return res.status(401).send({ msg: 'Invalid token' });
      }
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

// get a single doctor //

Doctor.get("/GetSingleDoctor/:doctorId", async (req, res) => {
  const doctorId = req.params.doctorId;
  try {
    const doctor = await DoctorModel.findByPk(doctorId);
    if (!doctor) {
      return res.status(404).send({ msg: "Doctor not found" });
    }
    
    res.status(200).send({ msg: "Doctor retrieved successfully", doctor });
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
});




// doctor can see app the appoints accoceted with him //
Doctor.get("/getAppointments/:doctorId", async (req, res) => {
  const { doctorId } = req.params;
  User.hasMany(AppointmentModel, { foreignKey: "UserID" });
  AppointmentModel.belongsTo(User, { foreignKey: "UserID" });
  try {
    const appointments = await AppointmentModel.findAll({
      where: { doctorId },
      include: [
        {
          model: User,
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
    Image,
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
    doctor.image = Image || doctor.Image;
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
