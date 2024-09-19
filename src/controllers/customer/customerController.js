const mongoose = require('mongoose')
const DataModel = require('../../model/customer/custommerModel')
const SalesModel = require('../../model/sales/salesModel')
const CreateService = require('../../service/common/CreateService')
const DropDownService = require('../../service/common/DropDownService')
const ListService = require('../../service/common/ListService')
const UpdateService = require('../../service/common/UpdateService')
const CheckAssociation = require('../../service/common/CheckAssociation')
const DeleteService = require('../../service/common/DeleteService')

exports.createCustomer = async (req, res) => {
    let data = await CreateService(req, DataModel)
    res.status(200).json(data)
}


exports.updateCustomer = async (req, res) => {
    let data = await UpdateService(req, DataModel)
    res.status(200).json(data)
}


exports.DropDownCustomer = async (req, res) => {
    let data= await DropDownService(req, DataModel, {_id: 1, CustomerName:1})
    res.status(200).json(data)
}


exports.CustomerList = async (req, res) => {
    let searchRegex = {"$regex": req.params.keyowrd, "$options": "i"}
    let searchArray = [{CustomerName: searchRegex}, {Address: searchRegex}]
    let data = await ListService(req, DataModel, searchArray)
    res.status(200).json(data)
}

exports.deleteCustomer = async (req, res) => {

    let DeleteId = req.params.id;
    let ObjectId = mongoose.Types.ObjectId;

    let associated = await CheckAssociation({CustomerId: new ObjectId(DeleteId)}, SalesModel)
    if(associated){
        res.status(200).json({status: 'associated', data: 'The category associated with a sale'})
    }else{
        let deleted = await DeleteService(req, DataModel)
        res.status(200).json({status: 'success', data: deleted})
    }

}