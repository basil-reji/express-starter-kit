var express = require('express');
var router = express.Router();
const { validateUser } = require('../middlewares/authorization');
const { findUserPermissions, validateUserPermission } = require('../middlewares/authorization');

const { loadMessage } = require('@controllers/general');
const admins = require('@services/admins');
const messages = require('@services/messages');
const admin = require('@controllers/admin');

const app_name = process.env.APP_NAME

router.use(validateUser(["super_admin", "admin"]))
router.use(findUserPermissions());

router.get('/',
    (req, res) => {
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
    }
);

router.get('/messages',
    validateUserPermission('messages', 'read'),
    admin.message.findAll(),
    (req, res) => {
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
        });
    }
);

router.post('/messages/delete',
    validateUserPermission('messages', 'delete'),
    admin.message.remove(),
    (req, res) => {
        res.status(200)
            .send(
                {
                    acknowledged: true,
                    message: "acknowledged"
                }
            );
    },
    (error, req, res) => {
        res.status(400)
            .send(
                {
                    error: error,
                    acknowledged: false,
                }
            )
    }
);

router.get('/admins',
    validateUserPermission('admins', 'write'),
    (req, res) => {
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
    }
);

router.get('/add-admin',
    validateUserPermission('admins', 'write'),
    loadMessage(),
    (req, res) => {
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
            admins_page: true
        });
    }
);

router.post('/add-admin',
    validateUserPermission('admins', 'write'),
    admin.admins.add(),
    (req, res) => {
        res.status(202).redirect('/admin/admins');
    },
    (error, req, res) => {
        req.flash('message', Object.values(error)[0]);
        res.status(400).redirect('/admin/add-admin');
    }
);

router.get('/admins/:id',
    validateUserPermission('admins', 'edit'),
    (req, res) => {
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
    }
);

router.post('/admins/update/:id',
    validateUserPermission('admins', 'edit'),
    (req, res) => {
        admins.updateAdmin(req.params.id, req.body)
            .then((response) => {
                res.redirect('/admin/admins/')
            })
    }
);

router.post('/admins/remove/',
    validateUserPermission('admins', 'delete'),
    (req, res) => {
        admins.remove(req.body.id).then((response) => {
            res.status(200)
                .send(
                    {
                        response: "ok",
                        status: true
                    }
                );
        })
    }
);

router.get('/account',
    (req, res) => {
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
    }
);

router.post('/account/update/profile',
    (req, res) => {
        admins.updateAccount(res.locals.user._id, req.body)
            .then((response) => {
                res.send({
                    acknowledged: true,
                    message: 'acknowledged'
                })
            }).catch((error) => {
                res.status(400)
                    .send({
                        acknowledged: false,
                        message: 'error',
                        error: error
                    })
            })
    }
);

module.exports = router;
