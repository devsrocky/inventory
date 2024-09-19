const express = require('express')
const router = express.Router()

// AUTH VERIFICATION
const Authverification = require('../middleware/Authverification')

// CONTROLLERS
const UserController = require('../controllers/user/UserController')
const BrandController = require('../controllers/brand/brandController')
const categoryController = require('../controllers/category/categoryController')
const supplierController = require('../controllers/suplier/suplierController')
const custommerController = require('../controllers/customer/customerController')
const expenseTypeController = require('../controllers/expenses/expenseTypesController')
const expenseController = require('../controllers/expenses/expenseController')
const productController = require('../controllers/product/productController')
const purchaseController = require('../controllers/purchase/purchaseController')
const salesController = require('../controllers/sales/salesController')
const returnController = require('../controllers/return/returnController')
const reportController = require('../controllers/reports/reportsController')
const summaryController = require('../controllers/summary/ExpenseSummary')



// PATH SPECIFIED

router.post("/Registration", UserController.Registration)
router.post("/Login", UserController.Login)
router.post("/UserUpdate", Authverification, UserController.UserUpdate)
router.get("/UserDetails", Authverification, UserController.UserDetails)

router.get("/UserEmailVerify/:email", UserController.UserEmailVerify)
router.get("/UserOTPVerify/:email/:otp", UserController.UserOTPVerify)
router.post("/UserPassReset/:email/:otp", UserController.UserPassReset)


// brand
router.post("/CreateBrand", Authverification, BrandController.CreateBrand)
router.post("/UpdateBrand/:id", Authverification, BrandController.UpdateBrand)
router.get("/DropDownBrand", Authverification, BrandController.DropDownBrand)
router.get("/BrandList/:pageNo/:perPage/:keyword", Authverification, BrandController.BrandList)
router.get("/deleteBrand/:id", Authverification, BrandController.deleteBrand)

// category
router.post("/createCategory", Authverification, categoryController.createCategory)
router.post("/updateCategory/:id", Authverification, categoryController.updateCategory)
router.get("/DropDownCategory", Authverification, categoryController.DropDownCategory)
router.get("/CategoryList/:pageNo/:perPage/:keyword", Authverification, categoryController.CategoryList)
router.get('/deleteCategory/:id', Authverification, categoryController.deleteCategory)

// suplier
router.post("/createSupplier", Authverification, supplierController.createSupplier)
router.post("/updateSupplier/:id", Authverification, supplierController.updateSupplier)
router.get("/dropDownSupplier", Authverification, supplierController.dropDownSupplier)
router.get("/supplierList/:pageNo/:perPage/:keyword", Authverification, supplierController.supplierList)
router.get("/deleteSupplier/:id", Authverification, supplierController.deleteSupplier)


// custommer
router.post("/createCustomer", Authverification, custommerController.createCustomer)
router.post("/updateCustomer/:id", Authverification, custommerController.updateCustomer)
router.get("/DropDownCustomer", Authverification, custommerController.DropDownCustomer)
router.get("/CustomerList/:pageNo/:perPage/:keyword", Authverification, custommerController.CustomerList)
router.get("/deleteCustomer/:id", Authverification, custommerController.deleteCustomer)

// expense types
router.post("/createExpenseType", Authverification, expenseTypeController.createExpenseType)
router.post("/updateExpenseType/:id", Authverification, expenseTypeController.updateExpenseType)
router.get("/DropDownExpenseType", Authverification, expenseTypeController.DropDownExpenseType)
router.get("/expenseTypeLists/:pageNo/:perPage/:keyword", Authverification, expenseTypeController.expenseTypeLists)
router.get("/deleteExpenseType/:id", Authverification, expenseTypeController.deleteExpenseType)

// expenses
router.post("/createExpense", Authverification, expenseController.createExpense)
router.post("/updateExpense/:id", Authverification, expenseController.updateExpense)
router.get("/expenesList/:pageNo/:perPage/:keyword", Authverification, expenseController.expenesList)
router.get("/deleteExpense/:id", Authverification, expenseController.deleteExpense)


// prodouct
router.post("/createProduct", Authverification, productController.createProduct)
router.post("/updateProduct/:id", Authverification, productController.updateProduct)
router.get("/productList/:pageNo/:perPage/:keyword", Authverification, productController.productList)
router.get("/deleteProduct/:id", Authverification, productController.deleteProduct)

// purchase
router.post('/createParentChild', Authverification, purchaseController.createParentChild)
router.get('/purchaseList/:pageNo/:perPage/:keyword', Authverification, purchaseController.purchaseList)
router.get('/purchaseDelete/:id', Authverification, purchaseController.purchaseDelete)

// sales
router.post('/createSales', Authverification, salesController.createSales)
router.get('/salesList/:pageNo/:perPage/:keyword', Authverification, salesController.salesList)
router.get('/salesDelete/:id', Authverification, salesController.salesDelete)

// return
router.post('/createReturn', Authverification, returnController.createReturn)
router.get('/returnList/:pageNo/:perPage/:keyword', Authverification, returnController.returnList)
router.get('/returnDelete/:id', Authverification, returnController.returnDelete)


// reports
router.get('/expenseReport', Authverification, reportController.expenseReport)
router.get('/purchaseReport', Authverification, reportController.purchaseReport)
router.get('/returnReport', Authverification, reportController.returnReport)
router.get('/salesReport', Authverification, reportController.salesReport)


// summary
router.get('/expenseSummary', Authverification, summaryController.expenseSummary)
router.get('/returnSummary', Authverification, summaryController.returnSummary)
router.get('/purchaseSummary', Authverification, summaryController.purchaseSummary)
router.get('/salesSummary', Authverification, summaryController.salesSummary)



// EXPORT ROUTER
module.exports = router;