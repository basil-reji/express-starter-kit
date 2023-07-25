const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const collections = require('../collections.json');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    surName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    password: { type: String, required: true },
    role: {
        type: String,
        required: true,
        enum: ['super_admin', 'admin', 'user'],
        default: 'user'
    },
    permissions: [{
        asset: { type: String, required: true },
        read: { type: Boolean, default: false },
        write: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
        delete: { type: Boolean, default: false }
    }],
    status: {
        type: String,
        required: true,
        enum: ['active', 'inactive', 'suspended'],
        default: 'active'
    },
    address: {
        addressLine1: { type: String },
        addressLine2: { type: String },
        city: { type: String },
        state: { type: String },
        postalCode: { type: String },
        country: { type: String },
    }
}, 
{ 
    timestamps: true,
    collection: collections.USER
});

// Hash the password before saving it to the database
userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        return next();
    } catch (err) {
        return next(err);
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;