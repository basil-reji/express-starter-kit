const admins = require('@services/admins');

const listAll = () => {
    return (req, res, next) => {
        admins.getAll()
            .then((response) => {
                res.locals.admins = response
                next()
            }).catch((error) => {
                next(error)
            })
    }
}

const add = () => {
    return (req, res, next) => {
        admins.add(req.body)
            .then((response) => {
                next()
            }).catch((error) => {
                next(error)
            })
    }
}

const update = () => {
    return (req, res, next) => {
        admins.add(req.body)
            .then((response) => {
                next()
            }).catch((error) => {
                next(error)
            })
    }
}

module.exports = {
    add,
    update,
    listAll
}