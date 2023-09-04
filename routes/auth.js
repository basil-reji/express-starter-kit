const express = require('express');
const router = express.Router();

const user = require('@controllers/user');

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

router.get('/login',
    (req, res) => {
        res.render('auth/login', {
            title: `Login | ${app_name}`,
            noHeader: true,
            noFooter: true,
            app_name,
        });
    }
);

router.post('/login',
    user.login,
    (req, res) => {
        res.redirect('/');
    },
    (error, req, res, next) => {
        res.render('auth/login', {
            title: `Login | ${app_name}`,
            noHeader: true,
            noFooter: true,
            message: error.message,
            app_name,
        });
    }
);

router.get('/signup',
    (req, res) => {
        res.render('auth/signup', {
            title: `Signup | ${app_name}`,
            noHeader: true,
            noFooter: true,
            app_name
        });
    }
);

router.post('/signup',
    user.signup,
    (req, res) => {
        res.redirect('/login');
    },
    (error, req, res, next) => {
        res.render('auth/signup', {
            title: `Signup | ${app_name}`,
            noHeader: true,
            noFooter: true,
            message: error.message,
            app_name
        });
    }
);

router.get('/logout',
    user.logout,
    (req, res) => {
        res.redirect('/');
    }
);

router.get('/admin/logout',
    user.logout,
    (req, res) => {
        res.redirect('/');
    }
);

router.get('/forgot-password', (req, res) => {
    res.render('auth/forgot_password', {
        title: `Forgot Password | ${app_name}`,
        noHeader: true,
        noFooter: true,
        app_name
    });
});

module.exports = router;
