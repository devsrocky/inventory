const mongoose = require('mongoose')
const DataModel = require('../../model/suplier/suplierModel')
const PurchaseModel = require('../../model/purchase/purchaseModel')
const CheckAssociation = require('../../service/common/CheckAssociation')
const CreateService = require('../../service/common/CreateService')
const DeleteService = require('../../service/common/DeleteService')
const DropDownService = require('../../service/common/DropDownService')
const ListService = require('../../service/common/ListService')
const UpdateService = require('../../service/common/UpdateService')


exports.createSupplier = async (req, res) => {
    let data = await CreateService(req, DataModel)
    res.status(200).json(data)
}

exports.updateSupplier = async (req, res) => {
    let data = await UpdateService(req, DataModel)
    res.status(200).json(data)
}

exports.dropDownSupplier = async (req, res) => {
    let data = await DropDownService(req, DataModel, {_id:1, Name:1})
    res.status(200).json(data)
}

exports.supplierList = async (req, res) => {
    let searchRegex = {"$regex": req.params.keyowrd, "$options": "i"}
    let searchArray = [{Name: searchRegex}, {Address: searchRegex}, {Phone: searchRegex}, {Email: searchRegex}]
    let data = await ListService(req, DataModel, searchArray)
    res.status(200).json(data)
}

exports.deleteSupplier = async (req, res) => {
    let DeleteId = req.params.id;
    let ObjectId = mongoose.Types.ObjectId;

    let associated = await CheckAssociation({SupplierId: new ObjectId(DeleteId)}, PurchaseModel)
    if(associated){
        res.status(200).json({status: 'associated', data: 'The category associated with Purchase'})
    }else{
        let deleted = await DeleteService(req, DataModel)
        res.status(200).json({status: 'success', data: deleted})
    }
}
