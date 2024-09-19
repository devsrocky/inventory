const mongoose = require('mongoose')
const DataModel = require('../../model/brand/brandModel')
const ProductModel = require('../../model/product/productModel')
const CreateService = require('../../service/common/CreateService')
const DropDownService = require('../../service/common/DropDownService')
const ListService = require('../../service/common/ListService')
const UpdateService = require('../../service/common/UpdateService')
const CheckAssociation = require('../../service/common/CheckAssociation')
const DeleteService = require('../../service/common/DeleteService')


exports.CreateBrand = async (req, res) => {
    let data = await CreateService(req, DataModel)
    res.status(200).json(data)
}

exports.UpdateBrand = async (req, res) => {
    let data = await UpdateService(req, DataModel)
    res.status(200).json(data)
}

exports.BrandList = async (req, res) => {

    let searchRegex = {"$regex": req.params.keyword, "$options": "i"}
    let SearchArray = [{Name: searchRegex}];
    let data = await ListService(req, DataModel, SearchArray);
    res.status(200).json(data);

}

exports.DropDownBrand = async (req, res) => {
    let data = await DropDownService(req, DataModel, {_id:1, Name: 1})
    res.status(200).json(data)
}

exports.deleteBrand = async (req, res) => {
    let DeleteId = req.params.id;
    const ObjectId = mongoose.Types.ObjectId;

    let associate = await CheckAssociation({BrandId: new ObjectId(DeleteId)},ProductModel)
    if(associate){
        res.status(200).json({status: 'Associated', data: 'The brand is associated with a product.'})
    }else{
        let deleted = await DeleteService(req, DataModel)
        res.status(200).json({status: 'success', data: deleted})
    }
    
}