const sequelize=require("sequelize")
module.exports=(sequelize,Datatypes)=>{
    const Logoutdetails=sequelize.define('Logoutdetail',{
        
        
        token:Datatypes.STRING
       
    })
    return Logoutdetails;
}