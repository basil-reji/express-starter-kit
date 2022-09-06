var express = require('express');
var router = express.Router();

const app_name = process.env.APP_NAME

const isAdmin = (req, res, next) => {
    try{
        if (req.user.permission.admin) {
            next();
        }else{
            res.redirect('/login');
        }
    }catch{
        res.redirect('/login');
    }
}

/* GET Admin listing. */
router.get('/', isAdmin, function (req, res, next) {
    user = req.user
    res.render('admin/dashboard', {
        title: app_name,
        page_title: 'Dashboard',
        breadcrumbs: [
            {
                page_name: 'Dashboard',
                active: true,
            }
        ],
        dashboard_page: true,
        user
    });
});

router.get('/messages', function (req, res, next) {
    user = req.user
    res.render('admin/messages', {
        title: app_name,
        page_title: 'Contacts',
        breadcrumbs: [
            {
                page_name: 'Messages',
                active: true,
            }
        ],
        messages_page: true,
        user
    });
});

router.get('/admins', function (req, res, next) {
    // let user = req.user;
    user = req.user
    res.render('admin/admins', {
        title: app_name,
        page_title: 'Admins',
        breadcrumbs: [
            {
                page_name: 'Admins',
                active: true,
            }
        ],
        admins_page: true,
        user
    });
});

router.get('/add-admin', function (req, res, next) {
    // let user = req.user;
    user = req.user
    res.render('admin/admins/add_admin', {
        title: app_name,
        page_title: 'Admins',
        breadcrumbs: [
            {
                page_name: 'Admins',
                page_link: '/admins'
            },
            {
                page_name: 'Add Admin',
                active: true,
            }
        ],
        admins_page: true,
        user
    });
});

router.get('/account', function (req, res, next) {
    // let user = req.user;
    user = req.user
    res.render('admin/account', {
        title: app_name,
        page_title: 'My Account',
        breadcrumbs: [
            {
                page_name: 'account',
                active: true,
            }
        ],
        admin_page: true,
        user
    });
});

router.post('/account/update', function (req, res, next) {
    // let user = req.user;
    user = req.user
    console.log(req.body)
    res.send({
        status: true,
        message: 'ok'
    })

    // res.render('admin/account', {
    //     title: app_name,
    //     page_title: 'My Account',
    //     breadcrumbs: [
    //         {
    //             page_name: 'account',
    //             active: true,
    //         }
    //     ],
    //     admin_page: true,
    //     user
    // });
});

module.exports = router;
