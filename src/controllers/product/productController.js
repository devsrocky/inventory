const DataModel = require('../../model/product/productModel')
const ReturnProModel = require('../../model/return/returnProductModel')
const SalesProModel = require('../../model/sales/salesProductModel')
const PurchaseProModel = require('../../model/purchase/purchaseProductModel')
const CheckAssociation = require('../../service/common/CheckAssociation')
const CreateService = require('../../service/common/CreateService')
const DeleteService = require('../../service/common/DeleteService')
const ListTwoJoinService = require('../../service/common/ListTwoJoinService')
const UpdateService = require('../../service/common/UpdateService')
const { default: mongoose } = require('mongoose')

exports.createProduct = async (req, res) => {
    let data = await CreateService(req, DataModel)
    res.status(200).json(data)
}

exports.updateProduct = async (req, res) => {
    let data = await UpdateService(req, DataModel);
    res.status(200).json(data)
}

exports.productList = async (req, res) =>{

    let joinStage1 = {$lookup: {from: 'brands', localField: 'BrandId', foreignField: '_id', as: 'brand'}}
    let joinStage2 = {$lookup: {from: 'categories', localField: 'CategoryId', foreignField: '_id', as: 'category'}}

    let searchRgx = {"$regex": req.params.keyword, "$options": 'i'}
    let searchArray = [{Name: searchRgx}, {Unit: searchRgx}, {Details:searchRgx}, {'brand.Name': searchRgx}, {'category.Name': searchRgx}]
    let data = await ListTwoJoinService(req, DataModel, searchArray, joinStage1, joinStage2)
    res.status(200).json(data)
}

exports.deleteProduct = async (req, res) => {
    let DeleteId = req.params.id;
    let ObjectId = mongoose.Types.ObjectId;

    let ReturnAssociated = await CheckAssociation({ProductId: new ObjectId(DeleteId)}, ReturnProModel)
    let SalesAssociated = await CheckAssociation({ProductId: new ObjectId(DeleteId)}, SalesProModel)
    let PurchaseAssociated = await CheckAssociation({ProductId: new ObjectId(DeleteId)}, PurchaseProModel)


    if(ReturnAssociated){
        res.status(200).json({status: 'associated', data: 'The category associated with Return'})
    }else if(SalesAssociated){
        res.status(200).json({status: 'associated', data: 'The category associated with Sales'})
    }else if(PurchaseAssociated){
        res.status(200).json({status: 'associated', data: 'The category associated with Purchase'})
    }
    else{
        let deleted = await DeleteService(req, DataModel)
        res.status(200).json({status: 'success', data: deleted})
    }
}