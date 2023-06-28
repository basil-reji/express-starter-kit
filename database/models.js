const user = {
    user: {
        fname: '',
        sname: '',
        email: '',
        phone: null,
        password: null,
        role: 'user',
        status: 'active',
        profile: {
            image: '/assets/images/user/user.png',
            primary_address: {}
        },
        permissions: {
            restricted: true,
            self: {
                all: true,
            }
        },
        events: {
            joined: '',
            general: []
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
        status: 'active',
        profile: {
            image: '/assets/images/user/user.png',
            primary_address: {}
        },
        permissions: {
            restricted: false,
            admin: true,
            all: false,
            self: {
                all: false,
                view: true,
                edit: true,
                update: true,
            },
            messages: {
                all: false,
                view: true,
            },
            users: {
                all: false,
                view: true,
            },
        },
        events: {
            joined: '',
            general: []
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
        status: 'active',
        profile: {
            image: '/assets/images/user/user.png',
            primary_address: {}
        },
        permissions: {
            restricted: false,
            admin: true,
            all: true,
            admins: {
                all: true,
            },
            users: {
                all: true,
            },
            messages: {
                all: true,
            },
            registrations: {
                all: true,
            },
        },
        events: {
            joined: '',
            general: []
        },
        flags: {
            profile_completed: false,
        }
    },
};

module.exports.models = {
    user
};