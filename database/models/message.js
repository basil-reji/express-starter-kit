const mongoose = require('mongoose');
const collections = require('../collections.json');

const messageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
}, 
{ 
    timestamps: true,
    collection: collections.MESSAGE
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;