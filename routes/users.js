const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const mngUser = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = require('../config/key')
router.get('/test', (req, res) => {
    return res.json({ msg: "success" })
})

router.post('/register', (req, res, next) => {
    const { name, email, password } = req.body; 
    mngUser.findOne({ email: email }).then(user => {
        if (user) {
            return res.status(500).json({ msg: "Email id already exists." })
        } else {
            const newUser = new mngUser({
                name: name,
                email: email,
                avatar: 'somelink',
                password: password
            });
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, function (err, hash) {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    })
});

router.post('/login', (req, res, next) => {
    const { email, password } = req.body;
    mngUser.findOne({ email: email }).then(user => {
        if (!user) {
            return res.status(404).json({ msg: "user not found." });
        }
        bcrypt.compare(password, user.password, function (err, result) {
            if (result) {
                const payload = { id: user._id, name: user.name, email: user.email }
                jwt.sign(payload, secretKey.secret, { expiresIn: 3600 }, (err, token) => {
                    if (err) {
                        console.log(err)
                    }
                    return res.status(200).json({
                        success: true,
                        token: token
                    })
                });
            } else {
                return res.status(400).json({ msg: "Password Incorrect" });
            }
        })
    })
});

module.exports = router;