const { DataTypes } = require("sequelize");
const { sequelize } = require("../connection/connection");

const DoctorModel = sequelize.define("Doctor", {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  Gender: DataTypes.STRING,
  City: DataTypes.STRING,
  State: DataTypes.STRING,
  Language: DataTypes.STRING,
  Experience: DataTypes.STRING,
  Degree: DataTypes.STRING,
  Specialty: DataTypes.STRING,
  About: DataTypes.STRING,
  Image:DataTypes.STRING,
  approved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = {
  DoctorModel,
};
