//import mongoose
let CONFIG = require('../config/config');
let mongoose = require('mongoose');

//connect to mongoose
const dbPath = CONFIG['MONGODBPATH'] + CONFIG['DBNAME'];
const options = { useNewUrlParser: true, useUnifiedTopology: true }
const mongo = mongoose.connect(dbPath, options);
mongo.then(() => {
    console.log('connected');
}, error => {
    console.log(error, 'error');
})

module.exports = mongoose;