const express=require("express")
const passport=require("passport")
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const Gooclient_id="938781607616-03gn57bqc82j7dm2cd6iqvhvb6nn4hh0.apps.googleusercontent.com"
const Gooclient_secret="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"
const OauthRouter = express.Router()


passport.use(new GoogleStrategy({
    clientID: Gooclient_id,
    clientSecret: Gooclient_secret,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
 
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

  module.exports=OauthRouter