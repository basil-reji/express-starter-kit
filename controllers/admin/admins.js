const admins = require('@services/admins');

const listAll = (req, res, next) => {
    admins.getAll()
        .then((response) => {
            res.locals.admins = response;
            next()
        }).catch((error) => {
            next(error)
        })
}

const add = (req, res, next) => {
    admins.add(req.body)
        .then((response) => {
            next()
        }).catch((error) => {
            next(error)
        })
}

const get = (req, res, next) => {
    admins.get(req.params.id)
        .then((response) => {
            res.locals.admin = response;
            next()
        }).catch((error) => {
            next(error)
        })
}

const update = (req, res, next) => {
    admins.updateAdmin(req.params.id, req.body)
        .then((response) => {
            next()
        }).catch((error) => {
            next(error)
        })
}

const remove = (req, res, next) => {
    admins.remove(req.body)
        .then((response) => {
            next()
        }).catch((error) => {
            next(error)
        })
}

module.exports = {
    add,
    get,
    listAll,
    update,
    remove
}