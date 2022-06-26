const db = require('../config/database');
const bcrypt = require('bcrypt');

module.exports = {
    do_signup: (user) => {
        return new Promise(async (resolve, reject) => {
            user.password = await bcrypt.hash(user.password, 10);
            db.get()
                .collection(process.env.DB_COLLECTION_USER)
                .insertOne(user)
                .then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error)
                })
        })
    },

    check_user_exist: (email) => {
        return new Promise(async (resolve, reject) => {
            db.get()
                .collection(process.env.DB_COLLECTION_USER)
                .findOne(
                    {
                        email: email
                    }
                )
                .then((response) => {
                    if (response) {
                        resolve(true)
                    } else {
                        resolve(false)
                    }
                }).catch((error) => {
                    reject(error)
                })
        })
    }
}