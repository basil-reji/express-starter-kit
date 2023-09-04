const jwt = require('jsonwebtoken');
const User = require('../database/models/user');

const validateUser = (roles) => {
    return (req, res, next) => {
        let user = res.locals.user;

        if (user) {
            if (roles.includes(user.role)) {
                next();
            } else {
                res.redirect('/');
            }
        } else {
            res.redirect('/login')
        }
    }
}

const findUserPermissions = () => {
    return (req, res, next) => {
        let user = res.locals.user;

        if (user) {
            let permissions = {};
            if (["admin", "super_admin"].includes(user.role)) {
                permissions['admin'] = true;
            }
            user.permissions.forEach(element => {
                permissions[element.asset] = element;
            });
            res.locals.permissions = permissions;
            next();
        } else {
            res.locals.permissions = {}
            next();
        }
    }
}

const validateUserPermission = (asset, permission) => {
    return (req, res, next) => {
        let user = res.locals.user;

        const assetPermissions = user.permissions.find(
            (permission) => permission.asset === asset
        );

        if(assetPermissions[permission]){
            next();
        }else{
            res.redirect("/")
        }
    }
}

module.exports = {
    validateUser,
    findUserPermissions,
    validateUserPermission
}