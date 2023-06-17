const { DataTypes } = require("sequelize");
const { sequelize } = require("../connection/connection");

const AppointmentModel = sequelize.define(
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
    AppointmentDate: {
      type: DataTypes.DATEONLY,
    },
    AppointmentTime: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "pending",
    },
  },
  {
    timestamps: false,
  }
);

module.exports = {
  AppointmentModel,
};
