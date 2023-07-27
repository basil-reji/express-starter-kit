const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const collections = require('../collections.json');
const { isEmail, isEmpty } = require('validator')

const userSchema = new mongoose.Schema({
    firstName: { type: String },
    surName:{ type: String },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    phone: { type: String },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [8, 'Minimum password length is 8 characters']
    },
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
        type: Object,
        addressLine1: { type: String, default: null},
        addressLine2: { type: String, default: null},
        city: { type: String, default: null},
        state: { type: String },
        zip: { type: Number, default: null },
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
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        return next();
    } catch (err) {
        return next(err);
    }
});

//
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
};

const User = mongoose.model('User', userSchema);

module.exports = User;