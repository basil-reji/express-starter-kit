const User = require('@models/user');

const signup = (info) => {
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
                        user.save()
                            .then((response) => {
                                resolve(response);
                            }).catch((err) => {
                                // let error = new Error();
                                // error.status = 400;
                                reject(err);
                            });
                    } else {
                        let error = new Error('passwords must be same');
                        error.status = 400;
                        reject(error);
                    }
                } else {
                    let error = new Error('Some Error');
                    error.status = 400;
                    reject(error);
                }
            }).catch((error) => {
                reject(error)
            })
    })
}

module.exports = {
    signup
}