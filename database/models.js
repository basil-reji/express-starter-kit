const user = {
    user: {
        fname: '',
        sname: '',
        email: '',
        phone: null,
        password: null,
        role: 'user',
        profile: {
            image: '/assets/images/user/user.png',
            primary_address: {}
        },
        permission: {
            user: true,
            access: ['restricted', 'user']
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
        profile: {
            image: '/assets/images/user/user.png',
            primary_address: {}
        },
        permission: {
            admin: true,
            access: ['read', 'add', 'edit', 'delete', 'aprove', 'view',],
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
        profile: {
            image: '/assets/images/user/user.png',
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
};

module.exports.models = {
    user
};