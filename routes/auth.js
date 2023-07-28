var express = require('express');
var router = express.Router();
var authenticate = require('../controller/authentication');
var authenitcateUser = require('../config/authentication');

const app_name = process.env.APP_NAME

router.use((req, res, next) => {
    let user = req.user;

    if (user) {
        if (req.originalUrl == '/login' || req.originalUrl == '/signup') {
            res.redirect('/')
        } else if (user.permissions.admin) {
            if (req.originalUrl.startsWith("/admin")) {
                next()
            } else {
                res.redirect('/admin')
            }
        }
        else {
            next();
        }
    } else {
        next();
    }
})

/* GET home page. */
router.get('/login', (req, res) => {
    let message = req.flash('message');
    res.render('auth/login', {
        title: `Login | ${app_name}`,
        noHeader: true,
        noFooter: true,
        app_name,
        message
    });
});

router.get('/signup', (req, res) => {
    let message = req.flash('message');
    res.render('auth/signup', {
        title: `Signup | ${app_name}`,
        noHeader: true,
        noFooter: true,
        app_name,
        message
    });
});

router.post('/signup', (req, res) => {
    // console.log(req.body);
    let user = req.body;
    authenticate.signup(user)
        .then((response) => {
            res.status(202).redirect('/login')
        })
        .catch((error) => {
            req.flash('message', Object.values(error)[0]);
            res.status(400).redirect('/signup');
        })
});

router.post('/login', (req, res) => {
    authenitcateUser(req.body.email, req.body.password)
        .then((accessToken) => {
            const maxAge = 60 * 60 * 24 * 7
            res.cookie('accessToken', accessToken, { maxAge: maxAge, httpOnly: true });
            res.redirect('/');
        }).catch((error) => {
            // console.log(error);
            req.flash('message', error);
            res.redirect('/login')
        })
});

router.get('/logout', (req, res) => {
    if (req.session) { req.session.destroy() }
    res.clearCookie('accessToken');
    res.redirect('/');
});

router.get('/admin/logout', (req, res) => {
    if (req.session) { req.session.destroy() }
    res.clearCookie('accessToken');
    res.redirect('/');
});

router.get('/forgot-password', (req, res) => {
    res.render('auth/forgot_password', {
        title: `Forgot Password | ${app_name}`,
        noHeader: true,
        noFooter: true,
        app_name
    });
});

module.exports = router;
