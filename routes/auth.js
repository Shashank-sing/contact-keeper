const express = require('express');
const router = express.Router();


//@route   GET api/users
//@desc    get logged in user
//@access  Public   
router.get('/', (req,res) => {
    res.send("Get logged in user")
});


//@route   POST api/users
//@desc    auth user & get token
//@access  Private
router.get('/', (req, res) => {
    res.post("Log in user")
});

module.exports = router