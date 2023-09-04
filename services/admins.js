const mongoose = require('mongoose');
const User = require('@models/user');
const UserPermissions = require('@database/permissions.json');
const { getErrors, getErrorMessages } = require('@utils/errorHandler');

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
    return new Promise((resolve, reject) => {
        User.findById(id)
            .select("role")
            .then((response) => {
                let user = {
                    firstName: data.fname,
                    surName: data.sname,
                    phone: data.phone,
                    role: data.role
                }
                if (response.role != user.role) {
                    user.permissions = UserPermissions[role]
                }
                User.findOneAndUpdate(new mongoose.Types.ObjectId(id), user)
                    .then((response) => {
                        resolve({ acknowledged: true });
                    }).catch((error) => {
                        reject(error);
                    })

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
                resolve({ acknowledged: true });
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