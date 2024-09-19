const mongoose = require('mongoose')
const dataSchema = mongoose.Schema({

    UserEmail: {type: String},
    Name: {type: String},
    createDate: {type: Date, default: Date.now()}

}, {versionKey: false})

const CategoryModel = mongoose.model('categories', dataSchema)
module.exports = CategoryModel;