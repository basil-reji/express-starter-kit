const User = require('@models/user');
const jwt = require('jsonwebtoken');

const authenitcateUser = (email, password) => {
    return new Promise(async (resolve, reject) => {
        User.authenticate(email, password)
            .then((data) => {
                const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET);
                resolve(accessToken)
            })
            .catch((error) => {
                reject(error)
            })
    });
};

module.exports = authenitcateUser