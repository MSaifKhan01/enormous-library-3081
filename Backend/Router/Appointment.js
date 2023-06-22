const express = require("express");
const { AppointmentModel } = require("../Model/Appointment");
const AppointmentRoute = express.Router();

// POST route for creating an appointment
AppointmentRoute.post("/register", async(req,res) => {
  const {UserID, DoctorID, AppointmentDate, AppointmentTime} = req.body;

  // Validation should be placed here

  try {
    const newAppointment = await AppointmentModel.create({
      UserID: UserID,
      DoctorID: DoctorID,
      AppointmentDate: AppointmentDate,
      AppointmentTime: AppointmentTime,
      status: "pending" // default status
    });

    res.status(201).json({message: "Appointment successfully created!", appointment: newAppointment});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "There was a problem creating the appointment."});
  }
});

// GET route for retrieving an appointment by ID
AppointmentRoute.get("/:id", async (req, res) => {
  try {
    const appointment = await AppointmentModel.findByPk(req.params.id);

    if (appointment) {
      res.status(200).json(appointment);
    } else {
      res.status(404).json({message: "Appointment not found."});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "There was a problem retrieving the appointment."});
  }
});

AppointmentRoute.put("/:id", async (req, res) => {
  const {status} = req.body;
  try {
    const appointment = await AppointmentModel.findByPk(req.params.id);

    if (appointment) {
      appointment.status = status;
      await appointment.save();
      res.status(202).json({message: "Appointment Status is updated"});
    } else {
      res.status(404).json({message: "Appointment not found."});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "There was a problem updating the appointment."});
  }
});


// DELETE route for deleting an appointment by ID
AppointmentRoute.delete("/:id", async (req, res) => {
  try {
    const appointment = await AppointmentModel.destroy({
      where: {
        AppointmentID: req.params.id
      }
    });

    if (appointment) {
      res.status(200).json({message: "Appointment successfully deleted."});
    } else {
      res.status(404).json({message: "Appointment not found."});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "There was a problem deleting the appointment."});
  }
});

module.exports = AppointmentRoute;
