const ParentModel = require('../../model/sales/salesModel')
const ChildModel = require('../../model/sales/salesProductModel')
const CreateParentChild = require('../../service/common/CreateParentChildService')
const deleteParentChild = require('../../service/common/deleteParentChild')
const ListOneJoinService = require('../../service/common/ListOneJoinService')

exports.createSales = async (req, res) => {
    let data = await CreateParentChild(req, ParentModel, ChildModel, "SalesId")
    res.status(200).json(data)
}

exports.salesList = async (req, res) => {
    let searchRgx = {"$regex": req.params.keyword, "$optoins": "i"}
    let joinStage = {$lookup: {from: 'customers', localField: 'CustomerId', foreignField: '_id', as: 'Customer'}}
    let searchArray = [{Note: searchRgx}, {UserEmail: searchRgx}, {'Customer.UserEmail': searchRgx}, {'Customer.CustomerName': searchRgx}, {'Customer.Phone':searchRgx}, {'Customer.Address': searchRgx}]
    let data = await ListOneJoinService(req, ParentModel, searchArray, joinStage)
    res.status(200).json(data)
}

exports.salesDelete = async (req, res) => {
    let data = await deleteParentChild(req, ParentModel, ChildModel, "SalesId")
    res.status(200).json(data)
}