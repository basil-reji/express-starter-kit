var express = require('express');
var router = express.Router();
const admin = require('../controller/admin');
const authenticate = require('../controller/authentication')

const app_name = process.env.APP_NAME

const isAdmin = (req, res, next) => {
    try {
        if (req.user.permission.admin) {
            next();
        } else {
            res.redirect('/login');
        }
    } catch {
        res.redirect('/login');
    }
}

const haveFullControll = (req, res, next) => {
    if (req.user.permission.full_control) {
        next();
    } else {
        res.redirect('/');
    }
}

router.get('/', isAdmin, function (req, res, next) {
    let user = req.user
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

router.get('/messages', isAdmin, function (req, res, next) {
    let user = req.user;
    admin.message.getAll()
        .then((data) => {
            // console.log(data)
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
                user,
                data
            });
        })
});

router.post('/messages/delete', isAdmin, function (req, res, next) {
    let user = req.user
    admin.message.delete(req.body.id).then((response) => {
        res.send(
            {
                response: "acknowledged",
                status: true
            }
        );
    })
});

router.get('/admins', isAdmin, haveFullControll, function (req, res, next) {
    let user = req.user
    admin.admins.getAll()
        .then((admins) => {
            // console.log(response);
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
                user,
                admins
            });
        })
});

router.get('/add-admin', isAdmin, haveFullControll, function (req, res, next) {
    let user = req.user
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

router.post('/add-admin', haveFullControll, function (req, res, next) {
    // console.log(req.body);
    let user = req.body

    authenticate.check_user_exist(user.email).then((response) => {
        if (user.password == user.cpassword) {
            admin.admins.add(user).then((response) => {
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

router.get('/admins/:id', isAdmin, haveFullControll, function (req, res, next) {
    let user = req.user
    admin.admins.get(req.params.id)
        .then((admin) => {
            // console.log(response);
            res.render('admin/admins/edit_admin', {
                title: app_name,
                page_title: 'Admins',
                breadcrumbs: [
                    {
                        page_name: 'Admins',
                        page_link: '/admins'
                    },
                    {
                        page_name: 'Edit Admin',
                        active: true,
                    }
                ],
                admins_page: true,
                user,
                admin
            });
        })
});

router.post('/admins/update/:id', isAdmin, haveFullControll, function (req, res, next) {
    // console.log(req.params.id);
    // console.log(req.body)
    let user = req.user
    admin.admins.update(req.params.id, req.body)
        .then((response) => {
            res.redirect('/admin/admins/')
        })
});

router.post('/admins/remove/', isAdmin, haveFullControll, function (req, res, next) {
    let user = req.user
    admin.admins.remove(req.body.id).then((response) => {
        res.send(
            {
                response: "ok",
                status: true
            }
        );
    })
});

router.get('/account', isAdmin, function (req, res, next) {
    let user = req.user
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

router.post('/account/update', isAdmin, function (req, res, next) {
    let user = req.user
    // console.log(req.body)
    admin.account.update(user._id, req.body)
        .then((response) => {
            res.send({
                status: true,
                message: 'ok'
            })
        })
});

module.exports = router;
