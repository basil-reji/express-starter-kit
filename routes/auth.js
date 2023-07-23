var express = require('express');
var router = express.Router();
var authenticate = require('../controller/authentication');
var passport = require('../config/authentication');

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
router.get('/login', (req, res, next) => {
    let message = req.flash('message');
    res.render('auth/login', {
        title: `Login | ${app_name}`,
        noHeader: true,
        noFooter: true,
        app_name,
        message
    });
});

router.get('/signup', (req, res, next) => {
    let message = req.flash('message');
    res.render('auth/signup', {
        title: `Signup | ${app_name}`,
        noHeader: true,
        noFooter: true,
        app_name,
        message
    });
});

router.post('/signup', (req, res, next) => {
    // console.log(req.body);
    let user = req.body

    authenticate.check_user_exist(user.email).then((response) => {
        if (user.password == user.cpassword) {
            authenticate.signup(user).then((response) => {
                // console.log(user);
                // console.log(response);
                res.redirect('/login')
            })
        } else {
            req.flash('message', `Password not match`);
            res.redirect('/signup');
        }
    }).catch((error) => {
        req.flash('message', `${error}`);
        res.redirect('/signup');
    })

});

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: {
        type: 'messge',
        message: 'Invalid email or password'
    },
    failureMessage: true
}));

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        if (req.session) { req.session.destroy() }
        res.redirect('/');
    });
});

router.get('/admin/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        if (req.session) { req.session.destroy() }
        res.redirect('/');
    });
});

router.get('/forgot-password', (req, res, next) =>{
    res.render('auth/forgot_password', {
        title: `Forgot Password | ${app_name}`,
        noHeader: true,
        noFooter: true,
        app_name
    });
});

module.exports = router;
