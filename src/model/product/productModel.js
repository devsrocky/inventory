const mongoose = require("mongoose")
const dataSchema = mongoose.Schema({

    UserEmail: {type: String},
    Name: {type: String},
    Unit: {type: String},
    Details: {type: String},
    CategoryId: {type: mongoose.Schema.Types.ObjectId},
    BrandId: {type: mongoose.Schema.Types.ObjectId},
    createdDate: {type: Date, default: Date.now()}

}, {versionKey: false})

const productModel = mongoose.model('products', dataSchema);
module.exports = productModel;