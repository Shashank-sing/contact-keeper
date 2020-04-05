const express = require('express');
const User = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');


const { check, validationResult } = require('express-validator');

const router = express.Router();


//@route   POST /api/users
//@desc    Register a user
//access   Public
router.post("/", [
    check("name", "Please enter your name")
    .not()
    .isEmpty(),
    check("email", "Please Enter your email").isEmail(),
    check("password", "The password must be more than 6 characters").isLength({min: 6})
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const {name, password, email} = req.body;

    try {
        let user = await User.findOne({email});

        if(user) {
            return res.status(400).json({msg: "Use new email ID"});
        }

      user = new User({
            name, 
            password,
            email
        });

        var salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt)

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get("jwtSecret"), {
            expiresIn: 60,
        }, (err, token) => {
            if(err) {
                console.error(err.message);
            } else {
                res.json({token})
            }
        });
        


    } catch(err) {
        console.error(err.message);
        return res.status(500).send("Server Error")
    }

})

module.exports = router