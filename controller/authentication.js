const db = require('../database/connection');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');
const collections = require('../database/collections.json');


module.exports = {

    signup: (inf) => {
        return new Promise(async (resolve, reject) => {
            let user = db.models.user.user;
            user.fname = inf.fname;
            user.sname = inf.sname;
            user.email = inf.email;
            user.password = await bcrypt.hash(inf.password, 10);
            db.get()
                .collection(collections.USER)
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
                .collection(collections.USER)
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
    //         db.get()
    //             .collection(collections)
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