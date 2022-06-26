var express = require('express');
var router = express.Router();
var userHelper = require('../helper/userHelper')

/* GET home page. */
router.get('/', async function (req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;
