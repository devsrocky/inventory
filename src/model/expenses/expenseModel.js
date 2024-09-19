const mongoose = require('mongoose')

const dataSchema = mongoose.Schema({
    
    UserEmail: {type: String},
    Note: {type: String},
    Amount: {type: Number},
    TypeId: {type: mongoose.Schema.Types.ObjectId},
    createdDate: {type: Date, default: Date.now()}

}, {versionKey: false})

const expenseModel = mongoose.model('expenses', dataSchema)
module.exports = expenseModel;