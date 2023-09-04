const authenitcateUser = require('@config/authentication');
const user = require('@services/users');
const message = require('@services/messages');

const login = (req, res, next) => {
    authenitcateUser(req.body.email, req.body.password)
        .then((accessToken) => {
            const maxAge = 60 * 60 * 24 * 7
            res.cookie('accessToken', accessToken, { maxAge: maxAge, httpOnly: true });
            next();
        }).catch((error) => {
            next(error)
        })
}

const signup = (req, res, next) => {
    user.signup(req.body)
        .then((response) => {
            next();
        })
        .catch((error) => {
            next(error);
        })
}

const logout = (req, res, next) => {
    if (req.session) { req.session.destroy() }
    res.clearCookie('accessToken');
    res.redirect('/');
}

const contact = (req, res, next) => {
    message.add(req.body)
        .then((response) => {
            next();
        }).catch((error) => {
            next(error);
        });
}

module.exports = {
    login,
    signup,
    logout,
    contact
}