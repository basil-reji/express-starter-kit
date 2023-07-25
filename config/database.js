const mongoose = require('mongoose');

const DB_URI = process.env.DB_URI || 'mongodb://127.0.0.1:27017/test_db';

mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

module.exports = db;