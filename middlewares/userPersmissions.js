const findAll = () => {
    return (req, res, next) => {
        let user = req.user;

        if(user){
            let permissions = {};
            if (["admin", "super_admin"].includes(user.role)) {
                permissions['admin'] = true;
            }
            user.permissions.forEach(element => {
                permissions[element.asset] = element;
            });
            res.locals.permissions = permissions
        }else{
            res.locals.permissions = {}
        }

        next()
    }
}

const validate = (asset, permission) => {
    return (req, res, next) => {
        let user = req.user;

        const assetPermissions = user.permissions.find(
            (permission) => permission.asset === asset
        );

        if(assetPermissions[permission]){
            next()
        }else{
            res.redirect("/")
        }
    }
}

module.exports = {
    findAll, validate
};