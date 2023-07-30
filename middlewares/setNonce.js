const crypto = require('crypto');

const setNonce = (req, res, next) => {
    res.locals.nonce = crypto.randomBytes(16).toString('base64');
    next();
}

module.exports = setNonce