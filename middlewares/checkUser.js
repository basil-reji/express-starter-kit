const jwt = require('jsonwebtoken');
const User = require('../database/models/user');

const checkUser = (req, res, next) => {
    const token = req.cookies['accessToken'];
    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
            User.findById(decodedToken.id)
                .select({
                    _id: false,
                    password: false,
                    flags: false,
                })
                .lean()
                .then((user) => {
                    if (user) {
                        res.locals.user = user;
                        next();
                    } else {
                        next();
                    }
                }).catch((error) => {
                    res.status(400)
                    next()
                })
        })
    } else {
        next();
    }
};

module.exports = checkUser;