var express = require('express');
var router = express.Router();

const app_name = process.env.APP_NAME

/* GET Admin listing. */
router.get('/', function (req, res, next) {
    res.send('respond with admin resource');
});

router.get('/add-admin', function (req, res, next) {
    // let user = req.user;
    user = {
        permission: {
            admin: true
        }
    }
    res.render('admin/admins/add_admin', {
        title: app_name,
        admin_page: true,
        user
    });
});

module.exports = router;
