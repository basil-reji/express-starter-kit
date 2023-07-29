var express = require('express');
var router = express.Router();
const admins = require('../controller/admins');
const messages = require('../controller/messages');
const { validateUser } = require('../middlewares/authorization');
const { findUserPermissions, validateUserPermission } = require('../middlewares/authorization');

const app_name = process.env.APP_NAME

router.use(validateUser(["super_admin", "admin"]))
router.use(findUserPermissions());

router.get('/', function (req, res, next) {
    res.render('admin/dashboard', {
        title: app_name,
        page_title: 'Dashboard',
        breadcrumbs: [
            {
                page_name: 'Dashboard',
                active: true,
            }
        ],
        dashboard_page: true
    });
});

router.get('/messages', validateUserPermission('messages', 'read'), function (req, res, next) {
    messages.getAll()
        .then((data) => {
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
                data
            });
        })
});

router.post('/messages/delete', validateUserPermission('messages', 'delete'), function (req, res, next) {
    messages.remove(req.body.id)
        .then((response) => {
            res.status(200)
                .send(
                    {
                        acknowledged: true,
                        message: "acknowledged"
                    }
                );
        }).catch((error) => {
            res.status(400)
                .send(
                    {
                        acknowledged: false,
                    }
                )
        })
});

router.get('/admins', validateUserPermission('admins', 'write'), function (req, res, next) {
    admins.getAll()
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
                admins
            });
        })
});

router.get('/add-admin', validateUserPermission('admins', 'write'), function (req, res, next) {
    let message = req.flash('message');
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
        message
    });
});

router.post('/add-admin', validateUserPermission('admins', 'write'), function (req, res, next) {
    admins.add(req.body)
        .then((response) => {
            res.status(202).redirect('/admin/admins')
        })
        .catch((error) => {
            req.flash('message', Object.values(error)[0]);
            res.status(400).redirect('/admin/add-admin');
        })
});

router.get('/admins/:id', validateUserPermission('admins', 'edit'), function (req, res, next) {
    admins.get(req.params.id)
        .then((admin) => {
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
                admin
            });
        })
});

router.post('/admins/update/:id', validateUserPermission('admins', 'edit'), function (req, res, next) {
    admins.updateAdmin(req.params.id, req.body)
        .then((response) => {
            res.redirect('/admin/admins/')
        })
});

router.post('/admins/remove/', validateUserPermission('admins', 'delete'), function (req, res, next) {
    admins.remove(req.body.id).then((response) => {
        res.status(200)
            .send(
                {
                    response: "ok",
                    status: true
                }
            );
    })
});

router.get('/account', function (req, res, next) {
    res.render('admin/account', {
        title: app_name,
        page_title: 'My Account',
        breadcrumbs: [
            {
                page_name: 'account',
                active: true,
            }
        ],
        account_page: true
    });
});

router.post('/account/update/profile', function (req, res, next) {
    admins.updateAccount(res.locals.user._id, req.body)
        .then((response) => {
            res.send({
                acknowledged: true,
                message: 'acknowledged'
            })
        }).catch((error)=>{
            res.status(400)
            .send({
                acknowledged: false,
                message: 'error',
                error: error
            })
        })
});

module.exports = router;
