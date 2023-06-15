const { DataTypes } = require("sequelize");
const { sequelize } = require("../connection/connection");

const AppointmentModle = sequelize.define(
  "Appointment",
  {
    AppointmentID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    UserID: {
      type: DataTypes.INTEGER,
      references: {
        model: "users", // name of Target model
        key: "id", // key in Target model that we're referencing
      },
    },
    DoctorID: {
      type: DataTypes.INTEGER,
      references: {
        model: "Doctors", // name of Target model
        key: "id", // key in Target model that we're referencing
      },
    },
    AppointmentTime: {
      type: DataTypes.DATE,
    },
    Status: {
      type: DataTypes.STRING(20),
    },
    ApprovedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = {
  AppointmentModle,
};
