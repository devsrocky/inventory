const DataModel = require('../../model/expenses/expenseModel')
const CreateService = require('../../service/common/CreateService')
const DeleteService = require('../../service/common/DeleteService')
const ListOneJoinService = require('../../service/common/ListOneJoinService')
const UpdateService = require('../../service/common/UpdateService')

exports.createExpense = async (req, res) => {
    let data = await CreateService(req, DataModel)
    res.status(200).json(data)
}

exports.updateExpense = async (req, res) => {
    let data = await UpdateService(req, DataModel)
    res.status(200).json(data)
}

exports.expenesList = async (req, res) => {
    let searchRgx = {"$regex": req.params.keyword, "$options": "i"}
    let searchArray = [{Note: searchRgx}, {Amount: searchRgx}, {'Type.Name': searchRgx}]
    let joinStage = {$lookup: {from: 'expensetypes', localField: 'TypeId', foreignField: '_id', as: 'Type'}}
    let data = await ListOneJoinService(req, DataModel, searchArray, joinStage)
    res.status(200).json(data)
}

exports.deleteExpense = async (req, res) => {
    let data = await DeleteService(req, DataModel)
    res.status(200).json(data)
}