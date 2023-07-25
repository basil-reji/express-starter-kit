const userVadlidation = (roles) => {
    return (req, res, next) => {
        let user = req.user;

        if (user) {
            if (roles.includes(user.role)) {
                next();
            } else {
                res.redirect('/');
            }
        } else {
            res.redirect('/login')
        }

    }
}

module.exports = userVadlidation;