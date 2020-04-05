const express = require('express');
const Users = require('./routes/Users.js')
const Contacts = require('./routes/contacts.js')
const Auth = require('./routes/auth.js')
const connectDB = require('./config/db')


connectDB();

const app = express();

app.use(express.json({extended: false}));

app.use('/api/auth',Auth)
app.use('/api/users',Users)
app.use('/api/contacts',Contacts)

app.get('/', (req, res)=>res.send("Hello World"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`))