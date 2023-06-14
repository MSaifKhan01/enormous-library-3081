const express=require('express')
const {Userdetail}=require('../models/index')
const {Logoutdetail}=require("../models/logout.model")
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const { redis } = require("../redis")
const userrouter=express.Router()




userrouter.post("/register",async (req,res)=>{
    const {name,email,password,Gender}=req.body
console.log("hello1")
    try {
        console.log("hhhhhh")
        

        const isuserpresent=await Userdetail.findAll({
            where:{
                email
            },
            
        })
        if(isuserpresent.length==1){
            return res.send("user already exist")
        }else{
            bcrypt.hash(password,5,async (err,hash)=>{
                console.log("h1>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
                const newUser=await Userdetail.create({name,email,password:hash,Gender})
                console.log("h2>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        
                res.status(200).send({msg:"Registration succesful",newUser})
               })

        }


       
    } catch (error) {
        return res.status(401).send({msg:error.message})
    }
})

userrouter.post('/login',async (req,res)=>{
    const {email,password}=req.body

    const isuserpresent=await Userdetail.findOne({
        where:{
            email
        }
    })

    if(isuserpresent){
        console.log(isuserpresent)
        bcrypt.compare(password,isuserpresent.password,(err,result)=>{
            console.log(result)
            if(result){
                const token=jwt.sign({userID:isuserpresent.id},"jvd",{expiresIn:"1h"})

                res.cookie("token", token, { maxAge: 24* 60 * 60 });

                res.status(200).send({msg:"login succesful",token})
            }else{
                return res.send({msg:"wrong credintials"})
            }
        })
       
    }else{
        return res.status(404).send({msg:"Not registerd need to registration"})
    }
})


userrouter.post('/logout', async (req, res) => {
    const token=req.cookies
    // const { token } = req.body;
    console.log(token)
  
    try {
      // Verify if the token is valid and not blacklisted
      const isTokenBlacklisted = await Logoutdetail.findOne({
        where: {
          token,
        },
      });
  
      if (isTokenBlacklisted) {
        return res.status(401).send({ msg: 'Invalid token' });
      }
  
      // Blacklist the token by storing it in the BlacklistedToken table
      await Logoutdetail.create({ token });
    //   redis.set("token",token,"EX",60*200)
  
      res.status(200).send({ msg: 'Logout successful' ,token});
    } catch (error) {
      return res.status(401).send({ msg: error.message });
    }
  });
  



// userrouter.post("/logout",async(req,res)=>{
//     const token=req.headers.authorization
 
//     if(!token){
//         res.status(401).send({msg:"Token is not in headers"})
//     }else{
//         redis.set("token",token,"EX",60*200)
//     }
   
//     res.status(201).send({msg:"logout succesfull"})
// })



module.exports=userrouter