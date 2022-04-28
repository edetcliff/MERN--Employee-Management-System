const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let employeeModel = new Schema({
    firstName:{
        type: String
    },
    lastName: {
        type: String
    },
    department:{
        type: String
    },
    role: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: Number
    },
    password: {
        type: String
    },
    date: {
        type: String,
        default: Date.now
    }
},{
    collection: 'employeeCollection'
})
module.exports = mongoose.model('employeeModel', employeeModel);