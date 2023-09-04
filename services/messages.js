const mongoose = require('mongoose');
const Message = require('@models/message');

const getAll = () => {
    return new Promise((resolve, reject) => {
        Message.find()
            .lean()
            .then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            })
    })
}

const add = (data) => {
    return new Promise(async (resolve, reject) => {
        let message = new Message;
        message.name = data.name;
        message.email = data.email;
        message.subject = data.subject;
        message.message = data.message;
        message.save()
            .then((response) => {
                resolve(response)
            }).catch((error) => {
                reject(error)
            })
    })
}

const remove = (id) => {
    return new Promise((resolve, reject) => {
        Message.deleteOne(
            {
                _id: new mongoose.Types.ObjectId(id)
            }
        ).then((response) => {
            resolve(response);
        }).catch((error) => {
            reject(error);
        })
    })
}

module.exports = {
    getAll,
    add,
    remove
}