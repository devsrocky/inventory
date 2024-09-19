const mongoose = require('mongoose')
const dataSchema = mongoose.Schema({

    UserEmail: {type: String},
    QTY:{type: Number},
    UnitCost:{type: Number},
    Total: {type: Number},
    PurchaseId: {type: mongoose.Schema.Types.ObjectId},
    ProductId: {type: mongoose.Schema.Types.ObjectId},
    createdDate: {type: Date, default: Date.now()}

}, {versionKey: false})
const purchaseProductModel = mongoose.model('productPurchasess', dataSchema);
module.exports = purchaseProductModel;