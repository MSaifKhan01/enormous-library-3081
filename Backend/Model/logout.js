const { DataTypes } = require("sequelize");
const { sequelize } = require("../connection/connection");

const logoutModel = sequelize.define("logout", {
  token: DataTypes.STRING,
});

module.exports = {
  logoutModel,
};
