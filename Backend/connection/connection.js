const {Sequelize} = require("sequelize")

const sequelize = new Sequelize("heal_care","root","iqoo",{
    host:'localhost',
    dialect:"mysql"
})

module.exports={
    sequelize
}