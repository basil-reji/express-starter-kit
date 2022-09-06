var express = require('express');
var router = express.Router();

const app_name = process.env.APP_NAME
const user_template = {
    fname: 'First Name',
    sname: 'Surname',
    email: 'example@gmail.com',
    phone: '',
    password: null,
    role: 'super_admin',
    profile: {
        image: 'https://i.pinimg.com/564x/57/e4/7f/57e47fa25cab8a9b49aca903bfa049a8.jpg',
        primary_address: {
            address: "",
            city: "",
            district: "",
            state: "Kerala",
            country: 'India',
            pincode: "",
        }
    },
    permission: {
        admin: true,
        control: {
            view: true,
            read: true,
            add: true,
            edit: true,
            aprove: true,
            delete: true,
        },
        full_control: true
    },
    events: {
        careted: '',
        general: [],
        deleted: '',
    },
    flags: {
        profile_completed: false,
    }
}

/* GET Admin listing. */
router.get('/', function (req, res, next) {
    user = user_template
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
    user = user_template
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
    user = user_template
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

router.get('/admins/add-admin', function (req, res, next) {
    // let user = req.user;
    user = user_template
    res.render('admin/admins/add_admin', {
        title: app_name,
        admins_page: true,
        user
    });
});

router.get('/account', function (req, res, next) {
    // let user = req.user;
    user = user_template
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
    user = user_template
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
