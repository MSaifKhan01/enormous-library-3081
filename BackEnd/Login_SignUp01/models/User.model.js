
module.exports=(sequelize,Datatypes)=>{
    const Userdetails=sequelize.define('Userdetail',{
        name:Datatypes.STRING,
        email:Datatypes.STRING,
        password:Datatypes.STRING,
        Gender:Datatypes.STRING
       

    })
    return Userdetails;
}