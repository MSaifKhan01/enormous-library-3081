const { DataTypes } = require("sequelize");
const { sequelize } = require("../connection/connection");

const DoctorlogoutModel = sequelize.define("Doctorlogout", {
  token: DataTypes.STRING,
});

module.exports = {
    DoctorlogoutModel,
};
