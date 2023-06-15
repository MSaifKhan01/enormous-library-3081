const { DataTypes } = require("sequelize");
const { sequelize } = require("../connection/connection");

const DoctorModel = sequelize.define("Doctor", {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  Gender: DataTypes.STRING,
  City: DataTypes.STRING,
  State: DataTypes.STRING,
  Language: DataTypes.STRING,
  Experience: DataTypes.INTEGER,
  Degree: DataTypes.STRING,
  Specialty: DataTypes.STRING,
  approved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = {
  DoctorModel,
};
