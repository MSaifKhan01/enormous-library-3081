const express=require("express")
const passport=require("passport")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookie=require("cookie-parser")

const { User } = require('../Model/User');

var GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const client_id="938781607616-03gn57bqc82j7dm2cd6iqvhvb6nn4hh0.apps.googleusercontent.com"
const client_secret="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"

const faceClient_Id="1370250756879066"
const faceAppSecret_Key="c786d72e23d9e928282e84a687b3a40a"

const OauthRouter = express.Router()


passport.use(new GoogleStrategy({
    clientID: client_id,
    clientSecret: client_secret,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
 async  function(accessToken, refreshToken, profile, cb) {


 console.log("Token>>>>>>>>>>>",accessToken)
 console.log("   ")
console.log(profile.emails[0].value)


 const isUserPresent = await  User.findAll({
    where: {
        email:profile.emails[0].value
    },
})
console.log(isUserPresent)
if (isUserPresent.length == 1) {
    const token = jwt.sign({ userID: isUserPresent.id }, "jvd", { expiresIn: "1h" })
    cookie("token", token, { maxAge: 24 * 60 * 60 });
    // res.status(200).send({ msg: "login successful", token })
    // return res.send("user already exist")
} else {
    bcrypt.hash("password", 5, async (err, hash) => {
        const newUser = await User.create({ name:profile.displayName, email:profile.emails[0].value, password: hash })
        // res.status(200).send({ msg: "Registration successful", newUser })
    })
}
//  console.log(refreshToken)
 console.log(profile)
    // console.log(profile)
    cb("Welcome ")
  }
  
));

OauthRouter.get('/google',
  passport.authenticate('google', { scope: ['profile','email'] }));
// console.log(profile)
  OauthRouter.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {

    res.redirect('/');
  });






  passport.use(new FacebookStrategy({
    clientID: faceClient_Id,
    clientSecret: faceAppSecret_Key,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },

 


  async  function(accessToken, refreshToken, profile, cb) {


    console.log("Token>>>>>>>>>>>",accessToken)

    console.log(profile)
    console.log("   ")
   
   
   
    const isUserPresent = await  User.findAll({
       where: {
           name:profile.displayName
       },
   })
   console.log(isUserPresent)
   if (isUserPresent.length == 1) {
       const token = jwt.sign({ userID: isUserPresent.id }, "jvd", { expiresIn: "1h" })
       cookie("token", token, { maxAge: 24 * 60 * 60 });
       // res.status(200).send({ msg: "login successful", token })
       // return res.send("user already exist")
   } else {
       bcrypt.hash("password", 5, async (err, hash) => {
           const newUser = await User.create({ name:profile.displayName, email:profile.id, password: hash })
           // res.status(200).send({ msg: "Registration successful", newUser })
       })
   }
   //  console.log(refreshToken)
    console.log(profile)
       // console.log(profile)
       cb("Welcome ")
     }
     
   ));

OauthRouter.get('/facebook',
  passport.authenticate('facebook'));

  OauthRouter.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

  module.exports=OauthRouter