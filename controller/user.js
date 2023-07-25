const db = require('../config/database');
const bcrypt = require('bcrypt');
const collections = require('../database/collections.json');

const contact = {
    message: (data) => {
        return new Promise(async (resolve, reject) => {
            delete data[''];
            data.date = new Date();
            db.collection(collections.MESSAGE)
                .insertOne(data)
                .then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error)
                })
        })
    },
}

module.exports = {
    contact
}