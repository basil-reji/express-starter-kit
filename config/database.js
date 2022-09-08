const mongoClient = require('mongodb').MongoClient

const state = {
    db: null
}

module.exports.connect = function (done) {
    const url = process.env.DB_URL
    const dbname = process.env.DB_NAME

    mongoClient.connect(url, (err, data) => {
        if (err) return done(err)
        state.db = data.db(dbname)
        done()
    })
}

module.exports.get = function () {
    return state.db
}

module.exports.models = {

    user: {
        fname: '',
        sname: '',
        email: '',
        phone: null,
        password: null,
        role: 'user',
        profile:{
            image: 'https://i.pinimg.com/564x/57/e4/7f/57e47fa25cab8a9b49aca903bfa049a8.jpg',
            primary_address: {}
        },
        permission: {
            user: true,
            restricted: true,
            full_control: false
        },
        events: {
            careted: '',
            general: [],
            deleted: '',
        },
        flags: {
            profile_completion: false
        }
    },

    admin: {
        fname: '',
        sname: '',
        email: '',
        phone: null,
        password: null,
        role: 'admin',
        profile:{
            image: 'https://i.pinimg.com/564x/57/e4/7f/57e47fa25cab8a9b49aca903bfa049a8.jpg',
            primary_address: {}
        },
        permission: {
            admin: true,
            access: {
                view: true,
                read: true,
                add: true,
                edit: true,
            },
            full_control: false
        },
        events: {
            careted: '',
            general: [],
            deleted: '',
        },
        flags: {
            profile_completed: false,
        }
    },

    super_admin: {
        fname: '',
        sname: '',
        email: '',
        phone: null,
        password: null,
        role: 'super_admin',
        profile:{
            image: 'https://i.pinimg.com/564x/57/e4/7f/57e47fa25cab8a9b49aca903bfa049a8.jpg',
            primary_address: {}
        },
        permission: {
            admin: true,
            access: {
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
    },

}