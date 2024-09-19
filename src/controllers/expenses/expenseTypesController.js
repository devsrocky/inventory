const  mongoose = require('mongoose')
const DataModel = require('../../model/expenses/expenseTypeModel')
const ExpenseModel = require('../../model/expenses/expenseModel')
const CreateService = require('../../service/common/CreateService')
const DropDownService = require('../../service/common/DropDownService')
const ListService = require('../../service/common/ListService')
const UpdateService = require('../../service/common/UpdateService')
const CheckAssociation = require('../../service/common/CheckAssociation')
const DeleteService = require('../../service/common/DeleteService')

exports.createExpenseType = async (req, res) => {
    let data = await CreateService(req, DataModel)
    res.status(200).json(data)
}

exports.updateExpenseType = async (req, res) => {
    let data = await UpdateService(req, DataModel);
    res.status(200).json(data)
}

exports.DropDownExpenseType = async (req, res) => {
    let data = await DropDownService(req, DataModel, {_id: 1, Name: 1})
    res.status(200).json(data)
}

exports.expenseTypeLists = async (req, res) => {
    let searchRegex = {"$regex": req.params.keyword, "$options": "i"}
    let searchArray = [{Name: searchRegex}]
    let data = await ListService(req, DataModel, searchArray)
    res.status(200).json(data)
}

exports.deleteExpenseType = async (req, res) => {
    let DeleteId = req.params.id;
    let ObjectId = mongoose.Types.ObjectId;

    let associated = await CheckAssociation({TypeId: new ObjectId(DeleteId)}, ExpenseModel)
    if(associated){
        res.status(200).json({status: 'associated', data: 'The category associated with a product'})
    }else{
        let deleted = await DeleteService(req, DataModel)
        res.status(200).json({status: 'success', data: deleted})
    }
}