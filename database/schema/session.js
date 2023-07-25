const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const sessionSchema = new Schema({
    _id: String,
    session: Object,
    expires: Date,
});

const Session = model('Session', sessionSchema);

module.exports = Session;