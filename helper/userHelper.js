const db = require('../config/database');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');

module.exports = {
    update_user: (data) => {
        user = {
            fname: 'First Name',
            sname: 'Surname',
            email: 'example@gmail.com',
            phone: '',
            password: null,
            role: 'super_admin',
            profile: {
                image: 'https://i.pinimg.com/564x/57/e4/7f/57e47fa25cab8a9b49aca903bfa049a8.jpg',
                primary_address: {
                    address: "",
                    city: "",
                    district: "",
                    state: "Kerala",
                    country: 'India',
                    pincode: "",
                }
            }
        }
    }
}