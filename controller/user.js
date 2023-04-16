const db = require('../database/connection');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');
const collections = require('../database/collections.json');

const contact = {
    message: (data) => {
        return new Promise(async (resolve, reject) => {
            delete data[''];
            data.date = new Date();
            db.get()
                .collection(collections.MESSAGE)
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