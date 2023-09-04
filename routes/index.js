const express = require('express');
const router = express.Router();

const index = require('@controllers/index');
const user = require('@controllers/user');

const app_name = process.env.APP_NAME

/* GET home page. */
router.get('/',
    index.validateAdmin(['super_admin', 'admin']),
    (req, res) => {
        res.render('index', {
            title: app_name,
            home_page: true
        });
    }
);

router.get('/contact',
    (req, res) => {
        res.render('pages/contact', {
            title: `Contact Page | ${app_name}`,
            contact_page: true
        });
    }
);

router.post('/contact',
    user.contact,
    (req, res) => {
        res.status(200).send(
            {
                response: "acknowledged",
                status: true
            }
        );
    },
    (error, req, res) => {
        res.status(400).send(
            {
                error,
                response: "error",
                status: false
            }
        );
    }
);

router.get('/test', (req, res) => {
    res.render('test', {
        title: `Test Page | ${app_name}`
    });
});

router.post('/test', (req, res) => {
    res.send(
        {
            response: "acknowledged",
            status: true
        }
    );
});

module.exports = router;
