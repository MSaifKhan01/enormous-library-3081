const { DataTypes } = require("sequelize");
const { sequelize } = require("../connection/connection");

const AdminLogout = sequelize.define("AdminLogout", {
  token: DataTypes.STRING,
});

module.exports = {
    AdminLogout,
};
