const User = require('../database/models/user');
const { getErrors, getErrorMessages } = require('../helper/errorHandler')

const signup = (info) => {
    return new Promise(async (resolve, reject) => {

        checkUserExistance(info.email)
            .then((response) => {
                if (response) {
                    if (info.password == info.cpassword) {
                        let user = new User;
                        user.firstName = info.fname;
                        user.surName = info.sname;
                        user.email = info.email;
                        user.password = info.password;
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

const checkUserExistance = (email) => {
    return new Promise(async (resolve, reject) => {
        User.findOne(
            {
                email: email
            },
            {
                email: 1
            }
        ).then((response) => {
            if (response) {
                reject({ email: 'User Already Exist' })
            } else {
                resolve(true)
            }
        }).catch((error) => {
            const errors = handleErrors(error);
            reject(errors);
        })
    })
}

const login = (user) => {
    return new Promise((resolve, reject) => {

    })
}

module.exports = {
    signup,
    login
}