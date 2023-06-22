const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../Model/User');
const userRegister = express.Router();


userRegister.post("/register", async (req, res) => {
    const { name, email, password, Gender, Phone } = req.body;
    try {
        const isuserpresent = await User.findOne({
            where: { email }
        });
        if (isuserpresent) {
            return res.status(409).send({ msg: "User already exists" });
        }
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                return res.status(500).send({ msg: err.message });
            }
            const newUser = await User.create({ name, email, password: hash, Gender, Phone });
            res.status(200).send({ msg: "Registration successful", newUser });
        });
    } catch (error) {
        return res.status(500).send({ msg: error.message });
    }
});

module.exports={
    userRegister
}