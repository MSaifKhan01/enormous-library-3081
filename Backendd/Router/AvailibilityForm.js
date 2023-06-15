const express = require("express");
const { AvailabilityModel } = require("../Model/Availability");
const { DoctorModel } = require("../Model/Doctor");
const availabilityRouter = express.Router();


// this form is only for existing doctor who can create a available time for users
availabilityRouter.post("/add", async (req, res) => {
  const { doctorId, availableTime } = req.body;

  try {
    const doctor = await DoctorModel.findOne({
      where: { id: doctorId },
    });

    if (!doctor) {
      return res.status(404).send({ msg: "Doctor not found" });
    }

    const newAvailability = await AvailabilityModel.create({
      DoctorID: doctorId,
      AvailableTime: availableTime,
      IsBooked: false,
    });

    res.status(200).send({
      msg: "Availability added successfully. Awaiting doctor's approval.",
      newAvailability,
    });
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
});

module.exports = {
    availabilityRouter
}
