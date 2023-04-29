
const access_controll = (asset, access) => {
    return (req, res, next) => {
        let user = req.user;
    
        if (user) {
            if (user.permissions[asset].includes('all')) {
                next()
            } else if (user.permissions[asset].includes(access)) {
                next()
            } else {
                res.redirect('/')
            }
        } else {
            res.redirect('/login')
        }
    }
}

const admin_vadlidation = () => {
    return (req, res, next) => {
        let user = req.user;

        if (user) {
            if (user.permissions.admin) {
                next()
            } else if (user.role == 'admin') {
            } else {
                res.redirect('/')
            }
        } else {
            res.redirect('/login')
        }

    }
}

module.exports = {
    access_controll,
    admin_vadlidation
}