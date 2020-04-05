const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const Contact = require('../models/contacts')
const User = require('../models/users')
const { check, validationResult } = require('express-validator');

//@route     GET /api/contacts 
//@desc      get a contact
//@access    Private
router.get("/", auth, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
        res.json(contacts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

//@route     POST /api/contacts 
//@desc      send back a contact
//@access    Private
router.post("/", auth, [
    check('name', 'Please Enter a name').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
    }

    const { name, email, phone, type } = req.body;


    try {
        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id
        });

        const contact = await newContact.save();
        res.json(contact);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

})

//@route     PUT /api/contacts/:id 
//@desc      update a contact
//@access    Private
router.put("/:id",auth,  async (req, res) => {
    try {
        const {name, email, phone, type} = req.body;
        const contact = await Contact.findOneAndUpdate({_id: req.params.id}, {
            name, 
            email,
            phone, 
            type
        })

        res.json(contact);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

//@route     DELETE /api/contacts/:id
//@desc      delete a contact
//@access    Private
router.delete("/:id",auth, async (req, res) => {
    try {
        const contact = await Contact.findByIdAndRemove(req.params.id)
        res.json(contact);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router