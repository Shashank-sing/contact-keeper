const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/users.js')
const bcrypt = require("bcryptjs")
const config = require('config');
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')


//@route   GET api/auth
//@desc    get logged in user
//@access  Public   
router.get('/', auth, async (req, res) => {
    try {
        let user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch(err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});


//@route   POST api/auth
//@desc    auth user & get token
//@access  Private
router.post('/', [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter the password').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
        }, (err, token) => {
            if (err) {
                console.error(err.message);
            } else {
                res.json({ token })
            }
        })

    } catch (err) {
        if (err) {
            console.error(err.message);
            res.status(500).send('server error');
        }
    }


});

module.exports = router