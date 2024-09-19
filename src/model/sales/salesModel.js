const mongoose = require('mongoose')
const dataSchema = mongoose.Schema({

    UserEmail: {type: String},
    VatTax: {type: Number},
    Discount: {type: Number},
    OtherCost: {type: Number},
    ShippingCost: {type: Number},
    GrandTotal: {type: Number},
    Note: {type: String},
    CustomerId: {type: mongoose.Schema.Types.ObjectId},
    createdDate: {type: Date, default: Date.now()}

}, {versionKey: false})
const salesModel = mongoose.model('sales', dataSchema)
module.exports = salesModel;