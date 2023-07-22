var passport = require('passport');
var LocalStrategy = require('passport-local');
const db = require('../database/connection');
const collections = require('../database/collections.json');
const bcrypt = require('bcrypt');
const ObjectId = require('mongodb').ObjectId;

passport.use('local-login', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },
    (req, email, password, done) => {
        db.get()
            .collection(collections.USER)
            .findOne(
                {
                    email: email
                },
                {
                    projection: {
                        email: 1,
                        password: 1,
                        status: 1
                    }
                }
            )
            .then((user) => {
                if (user) {
                    if (user.status == 'active') {
                        bcrypt
                            .compare(password, user.password)
                            .then((status) => {
                                if (status) {
                                    return done(null, user);
                                } else {
                                    return done(null, false, req.flash('message', 'Incorrect password'));
                                }
                            }).catch((error) => {
                                return done(error)
                            });
                    } else {
                        return done(null, false, req.flash('message', `Account is ${user.status}`));
                    }
                } else {
                    return done(null, false, req.flash('message', 'Incorrect Email'));
                }
            }).catch((error) => {
                return done(error)
            })
    }
));

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        db.get()
            .collection(collections.USER)
            .findOne(
                {
                    _id: ObjectId(user._id)
                },
                {
                    projection: {
                        password: 0
                    }
                }
            )
            .then((user) => {
                // console.log("db read")
                // console.log(user)
                return cb(null, user);
            }).catch((error) => {
                return cb(error)
            })
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

module.exports = passport;