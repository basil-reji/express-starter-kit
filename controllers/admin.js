const messageController = require('./admin/message');
const adminsController = require('./admin/admins');

const admins = require('@services/admins');

const updateAccount = (req, res, next) => {
    admins.updateAccount(res.locals.user._id, req.body)
        .then((response) => {
            next()
        }).catch((error) => {
            next(error)
        })
}

module.exports = {
    message: messageController,
    admins: adminsController,
    updateAccount
}