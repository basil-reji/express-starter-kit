const Message = require('../database/models/message');

const contact = {
    message: (data) => {
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
    },
}

module.exports = {
    contact
}