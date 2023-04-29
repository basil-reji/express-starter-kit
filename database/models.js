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
        permissions: {
            restricted: true,
            self: ['view', 'update', 'delete']
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
        profile: {
            image: '/assets/images/user/user.png',
            primary_address: {}
        },
        access: ['admin', 'restricted'],
        permissions: {
            restricted: false,
            admin: true,
            self: ['view', 'update', 'delete'],
            messages: ['view', 'edit', 'update'],
            users: ['view']
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
        profile: {
            image: '/assets/images/user/user.png',
            primary_address: {}
        },
        permissions: {
            restricted: false,
            admin: true,
            access:{
                users: true,
                messages: true
            },
            users: ['all'],
            messages: ['all'],
            admins: ['all']     
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