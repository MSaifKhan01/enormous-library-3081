const { DataTypes } = require("sequelize");
const { sequelize } = require("../connection/connection");

const Admin = sequelize.define("Admin", {
    name:DataTypes.STRING,
    email:DataTypes.STRING,
    password:DataTypes.STRING,
    Role:DataTypes.STRING
});

module.exports = {
    Admin,
};