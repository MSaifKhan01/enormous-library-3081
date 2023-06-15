const { DataTypes } = require("sequelize");
const { sequelize } = require("../connection/connection");





const AvailabilityModel = sequelize.define(
  "Availability",
  {
    AvailabilityID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    DoctorID: {
      type: DataTypes.INTEGER,
      references: {
        model: "doctors",
        key: "id",
      },
    },
    AvailableTime: {
      type: DataTypes.DATE,
    },
    IsBooked: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    timestamps: false,
  }
);

module.exports={
    AvailabilityModel
}
