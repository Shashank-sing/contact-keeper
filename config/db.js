const mongoose = require('mongoose');
const config = require('config')
const db =config.get("mongodbURI")

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology:true
        })
        
        console.log("MongoDB Created");
    } catch(err) {
        console.error("mongo error" + err.message);
        process.exit(1);
    }
}

module.exports = connectDB;