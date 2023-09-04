const validateAdmin = (roles) => {
    return (req, res, next) => {
        if (res.locals.user && roles.includes(res.locals.user.role)) {
            res.redirect('/admin/')
        } else {
            next();
        }
    }
}

module.exports = {
    validateAdmin
}