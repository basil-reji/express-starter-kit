var express = require('express');
var router = express.Router();
var userHelper = require('../helper/userHelper');

const app_name = process.env.APP_NAME

/* GET home page. */
router.get('/', async function (req, res, next) {
    // console.log(req.session.passport.id);
    // console.log('User In Session:');
    // console.log(req.user);
    // console.log(req.session);
    // let user = req.user
    res.render('index',
        {
            title: app_name
        }
    );
});

module.exports = router;
