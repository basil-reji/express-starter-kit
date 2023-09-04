var express = require('express');
var router = express.Router();
const { validateUser } = require('../middlewares/authorization');
const { findUserPermissions, validateUserPermission } = require('../middlewares/authorization');

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
    admin.message.findAll,
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
    admin.message.remove,
    (req, res) => {
        res.status(200)
            .send(
                {
                    acknowledged: true,
                    message: "acknowledged"
                }
            );
    }, (error, req, res) => {
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
    admin.admins.listAll,
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
            admins_page: true
        });
    }
);

router.get('/admins/add',
    validateUserPermission('admins', 'write'),
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

router.post('/admins/add',
    validateUserPermission('admins', 'write'),
    admin.admins.add,
    (req, res) => {
        res.status(202).redirect('/admin/admins');
    }, (error, req, res, next) => {
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
            message: error.message
        });
    }
);

router.get('/admins/:id',
    validateUserPermission('admins', 'edit'),
    admin.admins.get,
    (req, res) => {
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
            admins_page: true
        });
    }
);

router.post('/admins/update/:id',
    validateUserPermission('admins', 'edit'),
    admin.admins.update,
    (req, res) => {
        res.redirect('/admin/admins/')
    }, (error, req, res, next) => {
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
                    message: error.message,
                    admin
                });
            })
    }
);

router.post('/admins/remove/',
    validateUserPermission('admins', 'delete'),
    admin.admins.remove,
    (req, res) => {
        res.status(200)
            .send(
                {
                    response: "ok",
                    status: true
                }
            );
    }, (error, req, res) => {
        res.status(400)
            .send(
                {
                    error: error,
                    response: "Error",
                    status: false
                }
            );
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
    admin.updateAccount,
    (req, res) => {
        res.send({
            acknowledged: true,
            message: 'acknowledged'
        })
        admins.updateAccount(res.locals.user._id, req.body)
            .then((response) => {

            }).catch((error) => {

            })
    }, (error, req, res) => {
        res.status(400)
            .send({
                acknowledged: false,
                message: 'error',
                error: error
            })
    }
);

module.exports = router;
