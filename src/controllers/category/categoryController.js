const mongoose = require('mongoose');
const DataModel = require('../../model/category/categoryModel')
const ProductModel = require('../../model/product/productModel')
const CreateService = require('../../service/common/CreateService');
const DropDownService = require('../../service/common/DropDownService');
const ListService = require('../../service/common/ListService');
const UpdateService = require('../../service/common/UpdateService');
const CheckAssociation = require('../../service/common/CheckAssociation');
const DeleteService = require('../../service/common/DeleteService');
const DetailsByIdService = require('../../service/common/DetailsByIdService');

exports.createCategory = async (req, res) => {
    let data = await CreateService(req, DataModel);
    res.status(200).json(data)
}

exports.updateCategory = async (req, res) => {
    let data = await UpdateService(req, DataModel)
    res.status(200).json(data)
}

exports.DropDownCategory = async (req, res) => {
    let data = await DropDownService(req, DataModel, {_id:1, Name: 1})
    res.status(200).json(data)
}

exports.CategoryList = async (req, res) => {
    let searchRegex = {"$regex": req.params.keyword, "$options": "i"}
    let searchArray = [{Name: searchRegex}]

    let data = await ListService(req, DataModel, searchArray)
    res.status(200).json(data)
}

exports.deleteCategory = async (req, res) => {
    let DeleteId = req.params.id;
    let ObjectId = mongoose.Types.ObjectId;

    let associated = await CheckAssociation({CategoryId: new ObjectId(DeleteId)}, ProductModel)
    if(associated){
        res.status(200).json({status: 'associated', data: 'The category associated with a product'})
    }else{
        let deleted = await DeleteService(req, DataModel)
        res.status(200).json({status: 'success', data: deleted})
    }
}

exports.CategoryDetailsById = async (req, res) => {
    let data = await DetailsByIdService(req, DataModel)
    res.status(200).json(data)
}