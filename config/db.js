const mongoose = require('mongoose');
require('dotenv').config();
const URL = process.env.MONGODB_URL 
// const URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/idea_clan'
const Connection = mongoose.connect(URL);

module.exports = { Connection };