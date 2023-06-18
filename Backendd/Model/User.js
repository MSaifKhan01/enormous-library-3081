const { DataTypes } = require("sequelize");
const { sequelize } = require("../connection/connection");

const User = sequelize.define("User", {
    name:DataTypes.STRING,
    email:DataTypes.STRING,
    password:DataTypes.STRING,
    Gender:DataTypes.STRING,
    Phone:DataTypes.STRING
 
});

module.exports = {
  User,
};