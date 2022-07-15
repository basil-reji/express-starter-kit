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
        type: 'user',
        permission: {
            user: true,
            restricted: true,
            full_control: false
        },
        primary_address: {},
        other_address: [],
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
        type: 'admin',
        permission: {
            admin: true,
            control: {
                view: true,
                read: true,
                add: true,
                edit: true,
            },
            full_control: false
        },
        primary_address: {},
        other_address: [],
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
        type: 'super_admin',
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
        primary_address: {},
        other_address: [],
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