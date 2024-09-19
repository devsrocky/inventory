const mongoose = require('mongoose')
const dataSchema = mongoose.Schema({

    UserEmail: {type: String},
    CustomerName: {type: String},
    Phone: {type: String},
    Email: {type: String},
    Address: {type: String},
    createdDate: {type: Date, default: Date.now}

}, {versionKey: false})

const customerModel = mongoose.model('customers', dataSchema)
module.exports = customerModel;