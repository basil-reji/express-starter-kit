const mongoose = require('mongoose');
const User = require('../database/models/user');
const UserPermissions = require('../database/permissions.json');
const { getErrors, getErrorMessages } = require('../helper/errorHandler');

const getAll = () => {
    return new Promise((resolve, reject) => {
        User.find(
            {
                'role': {
                    '$in': ['admin', 'super_admin']
                }
            },
        ).select({
            password: false,
            permission: false,
            flags: false
        }).lean()
            .then((response) => {
                // console.log(response)
                resolve(response);
            }).catch((error) => {
                reject(error);
            })
    })
}

const get = (id) => {
    return new Promise((resolve, reject) => {
        User.findById(id)
            .select({
                password: false,
                flags: false
            }).lean()
            .then((response) => {
                // console.log(response)
                resolve(response);
            }).catch((error) => {
                reject(error);
            })
    })
}

const add = (info) => {
    return new Promise(async (resolve, reject) => {
        User.checkUserExistance(info.email)
            .then((response) => {
                if (response) {
                    if (info.password == info.cpassword) {
                        let user = new User;
                        user.firstName = info.fname;
                        user.surName = info.sname;
                        user.email = info.email;
                        user.password = info.password;
                        user.role = info.role;
                        if (info.role == 'super_admin') {
                            user.permissions = UserPermissions.super_admin;
                        } else {
                            user.permissions = UserPermissions.admin
                        }
                        user.save()
                            .then((response) => {
                                resolve(response);
                            }).catch((err) => {
                                reject(getErrors(err));
                            });
                    } else {
                        reject({ password: 'passwords must be same' });
                    }
                } else {
                    reject({ email: 'Some Error' })
                }
            }).catch((error) => {
                reject(error)
            })
    })
}

const updateAdmin = (id, data) => {
    let user = {};
    if (data.role == 'admin') {
        let model = models.user.admin;
        user.permission = model.permission;
        user.fname = data.fname;
        user.sname = data.sname;
        user.role = model.role
    } else if (data.role == 'super_admin') {
        let model = models.user.super_admin;
        user.permission = model.permission;
        user.fname = data.fname;
        user.sname = data.sname;
        user.role = model.role
    } else {
        user = {}
    }
    return new Promise((resolve, reject) => {
        db.collection(collections.USER)
            .updateOne(
                {
                    '_id': new mongoose.Types.ObjectId(id)
                },
                {
                    $set: user,
                }
            )
            .then((response) => {
                // console.log(response)
                resolve(response);
            }).catch((error) => {
                reject(error);
            })
    })
}

const updateAccount = (id, data) => {
    let user = {
        firstName: data.fname,
        surName: data.sname,
        phone: data.phone
    }
    return new Promise((resolve, reject) => {
        User.findOneAndUpdate(id, user)
            .then((response) => {
                // console.log(response)
                resolve({acknowledged: true});
            }).catch((error) => {
                reject(error);
            })
    })
}

const updatePassword = (id, data) => {

}

const remove = (id) => {
    return new Promise((resolve, reject) => {
        User.deleteOne(
            {
                _id: new mongoose.Types.ObjectId(id)
            }
        ).then((response) => {
            // console.log(response)
            resolve(response);
        }).catch((error) => {
            reject(error);
        })
    })
}

module.exports = {
    get,
    getAll,
    add,
    updateAdmin,
    updateAccount,
    updatePassword,
    remove
}