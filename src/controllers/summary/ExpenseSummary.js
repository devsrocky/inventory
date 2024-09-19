const expenseModel = require('../../model/expenses/expenseModel')
const returnModel = require('../../model/return/returnModel')
const purchaseModel = require('../../model/purchase/purchaseModel')
const salesModel = require('../../model/purchase/purchaseModel')
const expenseSummaryService = require("../../service/summary/summaryService")
const returnSummaryService = require('../../service/summary/returnSummaryService')

exports.expenseSummary = async (req, res) => {
    let data = await expenseSummaryService(req, expenseModel)
    res.status(200).json(data)
}

exports.returnSummary = async (req, res) => {
    let data = await returnSummaryService(req, returnModel)
    res.status(200).json(data)
}

exports.purchaseSummary = async (req, res) => {
    let data = await returnSummaryService(req, purchaseModel)
    res.status(200).json(data)
}

exports.salesSummary = async (req, res) => {
    let data = await returnSummaryService(req, salesModel)
    res.status(200).json(data)
}