const ParentModel = require('../../model/return/returnModel')
const ChildModel = require('../../model/return/returnProductModel')
const CreateParentChild = require('../../service/common/CreateParentChildService');
const deleteParentChild = require('../../service/common/deleteParentChild');
const ListOneJoinService = require('../../service/common/ListOneJoinService');

exports.createReturn = async (req, res) => {
    let data = await CreateParentChild(req, ParentModel, ChildModel, "ReturnId");
    res.status(200).json(data)
}

exports.returnList = async (req, res) => {
    
    let searchRgx = {"$regex": req.params.keyword, "$options": "i"}
    let joinStage = {$lookup: {from: 'customers', localField: 'CustomerId', foreignField: '_id', as: 'Customer'}}
    let searchArray = [{Note: searchRgx}, {'Customer.CustomerName': searchRgx}, {'Customer.Phone': searchRgx}, {'Customer.Address': searchRgx}]
    let data = await ListOneJoinService(req, ParentModel, searchArray, joinStage)
    res.status(200).json(data)
}

exports.returnDelete = async (req, res) => {
    let data = await deleteParentChild(req, ParentModel, ChildModel, "ReturnId")
    res.status(200).json(data)
}