const db = require('../config/database');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');


module.exports = {

    updateAccount: (id, data) => {
        let user = {};
        user.fname = data.fname;
        user.sname = data.sname;
        if(data.phone.length > 5){
            user.phone = data.phone;
        }
        return new Promise((resolve, reject) => {
            db.get()
                .collection(process.env.DB_COLLECTION_USER)
                .updateOne(
                    {
                        '_id': ObjectId(id)
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
    },

    getAdmins: () => {
        return new Promise((resolve, reject) => {
            db.get()
                .collection(process.env.DB_COLLECTION_USER)
                .find(
                    {
                        'role': {
                            '$in': ['admin', 'super_admin']
                        }
                    },
                    {
                        projection: {
                            password: 0,
                            permission: 0,
                            events: 0,
                            flags: 0
                        }
                    }
                )
                .toArray()
                .then((response) => {
                    // console.log(response)
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                })
        })
    },

    getAdmin: (id) => {
        return new Promise((resolve, reject) => {
            db.get()
                .collection(process.env.DB_COLLECTION_USER)
                .findOne(
                    {
                        '_id': ObjectId(id)
                    },
                    {
                        projection: {
                            password: 0,
                            permission: 0,
                            events: 0,
                            flags: 0
                        }
                    }
                )
                .then((response) => {
                    // console.log(response)
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                })
        })
    },

    updateAdmin: (id, data) => {
        let user = {};
        if (data.role == 'admin') {
            let model = db.models.admin;
            user.permission = model.permission;
            user.fname = data.fname;
            user.sname = data.sname;
            user.role = model.role
        } else if (data.role == 'super_admin') {
            let model = db.models.super_admin;
            user.permission = model.permission;
            user.fname = data.fname;
            user.sname = data.sname;
            user.role = model.role
        } else {
            user = {}
        }
        return new Promise((resolve, reject) => {
            db.get()
                .collection(process.env.DB_COLLECTION_USER)
                .updateOne(
                    {
                        '_id': ObjectId(id)
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
    },

    removeAdmin: (id) => {
        return new Promise((resolve, reject) => {
            db.get()
                .collection(process.env.DB_COLLECTION_USER)
                .remove(
                    {
                        _id: ObjectId(id)
                    }
                )
                .then((response) => {
                    // console.log(response)
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                })
        })
    },

    getMessages: () => {
        return new Promise((resolve, reject) => {
            db.get()
                .collection(process.env.DB_COLLECTION_MESSAGE)
                .find()
                .toArray()
                .then((response) => {
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                })
        })
    },

    deleteMessage: (id) => {
        return new Promise((resolve, reject) => {
            db.get()
                .collection(process.env.DB_COLLECTION_MESSAGE)
                .remove(
                    {
                        _id: ObjectId(id)
                    }
                )
                .then((response) => {
                    // console.log(response)
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                })
        })
    },
}