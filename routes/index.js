var express = require('express');
var router = express.Router();
const messages = require('../controller/messages');

const app_name = process.env.APP_NAME

/* GET home page. */
router.get('/', (req, res) => {
    if (res.locals.user && res.locals.user.role == 'super_admin') {
        res.redirect('/admin/')
    } else {
        res.render('index', {
            title: app_name,
            home_page: true
        });
    }
});

router.get('/contact', (req, res) => {
    let user = req.user;
    res.render('pages/contact', {
        title: `Test Page | ${app_name}`,
        contact_page: true,
        user
    });
});

router.post('/contact', (req, res) => {
    messages.add(req.body)
        .then((response) => {
            res.send(
                {
                    response: "acknowledged",
                    status: true
                }
            );
        })
        .catch((error) => {
            res.send(
                {
                    error,
                    status: false
                }
            );
        })
});

router.get('/test', (req, res) => {
    let user = req.user;
    res.render('test', {
        title: `Test Page | ${app_name}`,
        user
    });
});

router.post('/test', (req, res) => {
    let user = req.user;
    // console.log(req.body)
    res.send(
        {
            response: "acknowledged",
            status: true
        }
    );
});

module.exports = router;
