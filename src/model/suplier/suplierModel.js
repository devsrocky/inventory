
const mongoose = require('mongoose')

const dataSchema = mongoose.Schema({

    UserEmail: {type: String},
    Name: {type: String},
    Address: {type: String},
    Phone: {type: String, unique: true},
    Email: {type: String},
    CreatedDate: {type: Date, default: Date.now()}


}, {versionKey: false})

const dataModel = mongoose.model('supliers', dataSchema)
module.exports = dataModel;