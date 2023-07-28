const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const collections = require('../collections.json');
const { isEmail } = require('validator')

const userSchema = new mongoose.Schema({
    firstName: { type: String },
    surName: { type: String },
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
        default: {},
        addressLine1: { type: String, default: null },
        addressLine2: { type: String, default: null },
        city: { type: String, default: null },
        state: { type: String },
        zip: { type: Number, default: null },
        country: { type: String },
    },
    flags: {
        type: Object,
        default: {}
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

userSchema.statics.authenticate = async function (email, password) {
    return new Promise((resolve, reject) => {
        this.findOne({ email: email })
            .select({
                status: true,
                password: true
            })
            .then((user) => {
                if (user) {
                    if (user.status == "active") {
                        bcrypt.compare(password, user.password).then((auth) => {
                            if (auth) {
                                resolve({ id: user._id });
                            } else {
                                reject('Incorrect Password');
                            }
                        })
                    } else {
                        reject(`User is ${user.status}`);
                    }
                } else {
                    reject("Invalid user");
                }
            })
    })
};

userSchema.statics.checkUserExistance = async function (email) {
    return new Promise(async (resolve, reject) => {
        User.findOne(
            {
                email: email
            },
            {
                email: 1
            }
        ).then((response) => {
            if (response) {
                reject({ email: 'User Already Exist' })
            } else {
                resolve(true)
            }
        }).catch((error) => {
            const errors = handleErrors(error);
            reject(errors);
        })
    })
}

const User = mongoose.model('User', userSchema);

module.exports = User;