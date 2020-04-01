const express = require('express');
const router = express.Router();


//@route     GET /api/contacts 
//@desc      get a contact
//@access    Private
router.get("/", (req ,res) => {
    res.send("get a contact")
})

//@route     POST /api/contacts 
//@desc      send back a contact
//@access    Private
router.post("/", (req ,res) => {
    res.send("send back a contact")
})

//@route     PUT /api/contacts/:id 
//@desc      update a contact
//@access    Private
router.put("/:id", (req ,res) => {
    res.send("update a contact")
})

//@route     DELETE /api/contacts/:id
//@desc      delete a contact
//@access    Private
router.delete("/:id", (req ,res) => {
    res.send("delete a contact")
})

module.exports = router