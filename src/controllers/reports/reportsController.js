const ExpenseReportService = require("../../service/report/ExpenseReport")
const purchaseReportService = require("../../service/report/purchaseReport")
const returnReportService = require("../../service/report/returnReport")
const salesReportService = require("../../service/report/salesReport")

exports.expenseReport = async (req, res) => {
    let data = await ExpenseReportService(req)
    res.status(200).json(data)
}

exports.purchaseReport = async (req, res) => {
    let data = await purchaseReportService(req)
    res.status(200).json(data)
}

exports.returnReport = async (req, res) => {
    let data = await returnReportService(req)
    res.status(200).json(data)
}

exports.salesReport = async (req, res) => {
    let data = await salesReportService(req)
    res.status(200).json(data)
}