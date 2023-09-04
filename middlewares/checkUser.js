const jwt = require('jsonwebtoken');
const User = require('@models/user');

const checkUser = (req, res, next) => {
    const token = req.cookies['accessToken'];
    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
            if(decodedToken && decodedToken.user){
                User.findById(decodedToken.user)
                .select({
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
            }else{
                next();
            }
        })
    } else {
        next();
    }
};

module.exports = checkUser;