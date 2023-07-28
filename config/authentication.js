const User = require('../database/models/user');
const jwt = require('jsonwebtoken');

const authenitcateUser = (email, password) => {
    return new Promise(async (resolve, reject) => {
        User.authenticate(email, password)
            .then((user) => {
                const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
                resolve(accessToken)
            })
            .catch((error) => {
                reject(error)
            })
    });
};

module.exports = authenitcateUser