const mongoose = require('mongoose')
const dataSchema = mongoose.Schema({

    UserEmail: {type: String},
    Name: {type: String},
    createdDate: {type: Date, default: Date.now()}

}, {versionKey: false})

const expenseTypeModel = mongoose.model('expensetypes', dataSchema)
module.exports = expenseTypeModel;