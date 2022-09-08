const { response } = require('express');
var express = require('express');
var router = express.Router();
var authenticate = require('../helper/authHelper');
var passport = require('../config/authentication');

const app_name = process.env.APP_NAME

const isUser = (req, res, next) =>{
    if (req.user) {
        res.redirect('/');
    } else {
        next();
    }
}

/* GET home page. */
router.get('/login', isUser, function (req, res, next) {
    let message = req.flash('message');
    res.render('auth/login', {
        title: `Login | ${app_name}`,
        noHeader: true,
        noFooter: true,
        app_name,
        message
    });
});

router.get('/signup', isUser, function (req, res, next) {
    let message = req.flash('message');
    res.render('auth/signup', {
        title: `Signup | ${app_name}`,
        noHeader: true,
        noFooter: true,
        app_name,
        message
    });
});

router.post('/signup', isUser, function (req, res, next) {
    // console.log(req.body);
    // let user = req.body

    authenticate.check_user_exist(user.email).then((response) => {
        if (user.password == user.cpassword) {
            authenticate.do_signup(user).then((response) => {
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

router.post('/admin/add-admin', function (req, res, next) {
    // console.log(req.body);
    let user = req.body

    authenticate.check_user_exist(user.email).then((response) => {
        if (user.password == user.cpassword) {
            authenticate.add_admin(user).then((response) => {
                // console.log(user);
                // console.log(response);
                res.redirect('/admin/admins')
            })
        } else {
            req.flash('message', `Password not match`);
            res.redirect('/admin/add-admin');
        }
    }).catch((error) => {
        req.flash('message', `${error}`);
        res.redirect('/admin/add-admin');
    })

});

router.post('/login', isUser, passport.authenticate('local-login', {
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
//     authenticate.test('62c99565949dd148c779750a').then((user)=>{
//         res.send(user)
//     })
// });

module.exports = router;
