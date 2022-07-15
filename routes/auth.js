const { response } = require('express');
var express = require('express');
var router = express.Router();
var authHelper = require('../helper/authHelper');
var passport = require('../config/authentication');

const app_name = process.env.APP_NAME

/* GET home page. */
router.get('/login', function (req, res, next) {
    let message = req.flash('message');
    res.render('auth/login', {
        title: `Login | ${app_name}`,
        noHeader: true,
        noFooter: true,
        app_name,
        message
    });
});

router.get('/signup', function (req, res, next) {
    let message = req.flash('message');
    res.render('auth/signup', {
        title: `Signup | ${app_name}`,
        noHeader: true,
        noFooter: true,
        app_name,
        message
    });
});

router.post('/signup', function (req, res, next) {
    // console.log(req.body);
    let user = req.body

    authHelper.check_user_exist(user.email).then((response) => {
        if (user.password == user.cpassword) {
            authHelper.do_signup(user).then((response) => {
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

router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        if(req.session){ req.session.destroy() }
        res.redirect('/');
    });
});

// router.get('/test', function (req, res, next) {
//     authHelper.test('62c99565949dd148c779750a').then((user)=>{
//         res.send(user)
//     })
// });

module.exports = router;
