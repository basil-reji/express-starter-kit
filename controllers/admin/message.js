const messages = require('@services/messages');

const findAll = (req, res, next) => {
    messages.getAll()
        .then(response => {
            res.locals.data = response;
            next();
        }).catch((error) => {
            next(error);
        })
}

const remove = (req, res, next) => {
    messages.remove(req.body.id)
        .then(response => {
            next()
        }).catch(error => {
            next(error)
        })
}

module.exports = {
    findAll,
    remove
}