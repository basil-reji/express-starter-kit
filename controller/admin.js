const db = require('../database/connection');
const { models } = require('../database/models');
const collections = require('../database/collections.json');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');

const account = {
    
    update: (id, data) => {
        let user = {};
        user.fname = data.fname;
        user.sname = data.sname;
        if (data.phone.length > 5) {
            user.phone = data.phone;
        }
        return new Promise((resolve, reject) => {
            db.get()
                .collection(collections.USER)
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
}

const admins = {

    getAll: () => {
        return new Promise((resolve, reject) => {
            db.get()
                .collection(collections.USER)
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

    get: (id) => {
        return new Promise((resolve, reject) => {
            db.get()
                .collection(collections.USER)
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

    add: (inf) => {
        return new Promise(async (resolve, reject) => {
            let user = models.user.user;
            if (inf.role == 'super_admin') {
                user = models.user.super_admin;
            } else {
                user = models.user.admin;
            }
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

    update: (id, data) => {
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
            db.get()
                .collection(collections.USER)
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

    remove: (id) => {
        return new Promise((resolve, reject) => {
            db.get()
                .collection(collections.USER)
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

const message = {

    getAll: () => {
        return new Promise((resolve, reject) => {
            db.get()
                .collection(collections.MESSAGE)
                .find()
                .toArray()
                .then((response) => {
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                })
        })
    },

    delete: (id) => {
        return new Promise((resolve, reject) => {
            db.get()
                .collection(collections.MESSAGE)
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

module.exports = {
    account,
    admins,
    message
}