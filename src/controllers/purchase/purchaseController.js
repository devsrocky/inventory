const ParentModel = require('../../model/purchase/purchaseModel')
const ChildModel = require('../../model/purchase/purchaseProductModel')
const CreateParentChild = require('../../service/common/CreateParentChildService')
const deleteParentChild = require('../../service/common/deleteParentChild')
const ListOneJoinService = require('../../service/common/ListOneJoinService')

exports.createParentChild = async (req, res) => {
    let data = await CreateParentChild(req, ParentModel, ChildModel, "PurchaseId")
    res.status(200).json(data)
}

exports.purchaseList = async (req, res) => {

    let joinStage = {$lookup: {from: 'supliers', localField: 'SupplierId', foreignField: '_id', as: 'supplier'}}
    let searchRgx = {"$regex": req.params.keyword, "$options": "i"}
    let searchArray = [{Note: searchRgx}, {'supplier.Name': searchRgx}, {'supplier.Address': searchRgx}, {'supplier.Phone': searchRgx}]
    let data = await ListOneJoinService(req, ParentModel, searchArray, joinStage)
    res.status(200).json(data)

}

exports.purchaseDelete = async (req, res) => {
    let data = await deleteParentChild(req, ParentModel, ChildModel, "PurchaseId")
    res.status(200).json(data)
}