const mongoose = require('mongoose')
const dataSchema = mongoose.Schema({

    UserEmail: {type: String},
    VatTax: {type: Number},
    Discount: {type: Number},
    OtherCost: {type: Number},
    ShippingCost: {type: Number},
    GrandTotal: {type: Number},
    Note: {type: String},
    SupplierId: {type: mongoose.Schema.Types.ObjectId},
    createdDate: {type: Date, default: Date.now()}

}, {versionKey: false})

const purchaseModel = mongoose.model('purchases', dataSchema)
module.exports = purchaseModel;