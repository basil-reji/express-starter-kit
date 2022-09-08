const db = require('../config/database');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');

module.exports = {
    contact: (data) => {
        return new Promise(async (resolve, reject) => {
            // console.log(data)
            delete data['']
            data.date = new Date()
            // resolve('')
            db.get()
                .collection(process.env.DB_COLLECTION_MESSAGE)
                .insertOne(data)
                .then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error)
                })
        })
    },
}