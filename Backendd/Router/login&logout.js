const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { logoutModel } = require('../Model/logout');
const { User } = require('../Model/User');
const userrouter = express.Router();


userrouter.post('/login', async (req, res) => {
    const { email, password } = req.body

    const isUserPresent = await User.findOne({
        where: {
            email
        }
    })

    if (isUserPresent) {
        bcrypt.compare(password, isUserPresent.password, (err, result) => {
            if (result) {
                const token = jwt.sign({ userID: isUserPresent.id }, "jvd", { expiresIn: "1h" })
                res.cookie("token", token, { maxAge: 24 * 60 * 60 });
                console.log(req.cookies.token)
                res.status(200).send({ msg: "login successful", token })
            } else {
                return res.send({ msg: "wrong credentials" })
            }
        })
    } else {
        return res.status(404).send({ msg: "Not registered need to registration" })
    }
});


userrouter.post('/logout', async (req, res) => {
    const token = req.cookies.token;
    console.log("********************************************************");
    console.log(token);
    console.log("********************************************************");
    if (!token) {
        return res.status(400).send({ msg: 'No token provided' });
    }
    try {
        const isTokenBlacklisted = await logoutModel.findOne({
            where: { token }
        });
        if (!isTokenBlacklisted) {
            await logoutModel.create({ token });
            res.clearCookie('token');
            res.status(200).send({ msg: 'Logout successful' });
        } else {
            return res.status(401).send({ msg: 'Invalid token' });
        }
    } catch (error) {
        return res.status(500).send({ msg: error.message });
    }
});

module.exports = {
    userrouter
};
