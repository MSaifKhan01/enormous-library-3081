const {Sequelize} = require("sequelize")

const sequelize = new Sequelize("heal_care","root","Saif@5038",{
    host:'localhost',
    dialect:"mysql"
})

module.exports={
    sequelize
}