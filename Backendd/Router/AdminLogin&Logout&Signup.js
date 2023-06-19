const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Admin } = require('../Model/Admin');
const { AdminLogout } = require('../Model/AdminLogout');

const AdminRouter = express.Router();


AdminRouter.post("/register", async (req, res) => {
    const { name, email, password, Role } = req.body;
    try {
        const isuserpresent = await Admin.findOne({
            where: { email }
        });
        if (isuserpresent) {
            return res.status(409).send({ msg: "User already exists" });
        }
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                return res.status(500).send({ msg: err.message });
            }
            const newUser = await Admin.create({ name, email, password: hash, Role });
            res.status(200).send({ msg: "Registration successful", newUser });
        });
    } catch (error) {
        return res.status(500).send({ msg: error.message });
    }
});




AdminRouter.post('/login', async (req, res) => {
    const { email, password } = req.body

    const isUserPresent = await Admin.findOne({
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


AdminRouter.post('/logout', async (req, res) => {
    const token = req.cookies.token;
    console.log("********************************************************");
    console.log(token);
    console.log("********************************************************");
    if (!token) {
        return res.status(400).send({ msg: 'No token provided' });
    }
    try {
        const isTokenBlacklisted = await AdminLogout.findOne({
            where: { token }
        });
        if (!isTokenBlacklisted) {
            await AdminLogout.create({ token });
            res.clearCookie('token');
            res.status(200).send({ msg: 'Logout successful' });
        } else {
            return res.status(401).send({ msg: 'Invalid token' });
        }
    } catch (error) {
        return res.status(500).send({ msg: error.message });
    }
});






module.exports={
    AdminRouter
}