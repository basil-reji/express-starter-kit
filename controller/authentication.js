const db = require('../config/database');
const bcrypt = require('bcrypt');
const collections = require('../database/collections.json');
const { models } = require('../database/models');


module.exports = {

    signup: (inf) => {
        return new Promise(async (resolve, reject) => {
            let user = models.user.user;
            user.fname = inf.fname;
            user.sname = inf.sname;
            user.email = inf.email;
            user.password = await bcrypt.hash(inf.password, 10);
            db.collection(collections.USER)
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
            db.collection(collections.USER)
                .findOne(
                    {
                        email: email
                    },
                    {
                        email: 1
                    }
                )
                .then((response) => {
                    if (response) {
                        reject('User Already Exist')
                    } else {
                        resolve(true)
                    }
                }).catch((error) => {
                    reject(error)
                })
        })
    },

    // test: (email) => {
    //     return new Promise((resolve, reject) => {
    //         db   .collection(collections)
    //             .findOne(
    //                 {
    //                     _id: ObjectId(email)
    //                 },
    //                 {
    //                     projection: {
    //                         password: 0
    //                     }
    //                 }~
    //             )
    //             .then((response) => {
    //                 // console.log(response)
    //                 resolve(response);
    //             }).catch((error) => {
    //                 reject(error);
    //             })
    //     })
    // },
}