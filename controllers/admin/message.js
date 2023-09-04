const messages = require('@services/messages');

const findAll = () => {
    return (req, res, next) => {
        messages.getAll()
            .then(response => {
                res.locals.data = response;
                next();
            }).catch((error) => {
                next(error);
            })
    }
}

const remove = () => {
    return (req, res, next) => {
        messages.remove()
            .then(response => {
                next()
            }).catch(error => {
                next(error)
            })
    }
}

module.exports = {
    findAll,
    remove
}