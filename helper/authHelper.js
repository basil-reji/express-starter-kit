const db = require('../config/database');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');


module.exports = {
    do_signup: (inf) => {
        return new Promise(async (resolve, reject) => {
            let user = db.models.user;
            user.fname = inf.fname;
            user.sname = inf.sname;
            user.email = inf.email;
            user.password = await bcrypt.hash(inf.password, 10);
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

    add_admin: (inf) => {
        return new Promise(async (resolve, reject) => {
            let user = db.models.user;
            if(inf.role == 'super_admin'){
                user = db.models.super_admin;
            }else{
                user = db.models.admin;
            }
            user.fname = inf.fname;
            user.sname = inf.sname;
            user.email = inf.email;
            user.password = await bcrypt.hash(inf.password, 10);
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
                    },
                    {
                        email: 1
                    }
                )
                .then((response) => {
                    if (response) {
                        reject('User Already Registered')
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
    //             .collection(process.env.DB_COLLECTION_USER)
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