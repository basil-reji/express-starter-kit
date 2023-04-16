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
        passReqToCallback: true
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
                        password: 1
                    }
                }
            )
            .then((user) => {
                if (user) {
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
                    return done(null, false, req.flash('message','Incorrect Email'));
                }
            }).catch((error) => {
                return done(error)
            })
    }
));

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, user._id);
    });
});

passport.deserializeUser(function (id, cb) {
    process.nextTick(function () {
        db.get()
            .collection(collections.USER)
            .findOne(
                {
                    _id: ObjectId(id)
                },
                {
                    projection: {
                        password: 0
                    }
                }
            )
            .then((user) => {
                return cb(null, user)
            }).catch((error) => {
                return cb(error)
            })
    });
});

module.exports = passport;