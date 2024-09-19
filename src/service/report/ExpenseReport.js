
const ExpenseModel = require('../../model/expenses/expenseModel')

const ExpenseReportService = async (Request) => {
    try{

        let UserEmail = Request.headers['email']
        let fromDate = Request.body['fromDate']
        let toDate = Request.body['toDate']

        let data = await ExpenseModel.aggregate([
            {$match: {UserEmail:UserEmail, createdDate: {$gte: new Date(fromDate), $lte: new Date(toDate)}}},
            {
                $facet: {
                    Total: [{
                        $group: {
                            _id: 0,
                            TotalAmount: {$sum: "$Amount"}
                        }
                    }],
                    Rows: [
                        {$lookup: {from: "expensetypes", localField: "TypeId", foreignField: "_id", as: "Type"}}
                    ]
                }
            }
        ])

        return {status: 'success', data: data}


    }catch(err){
        return {status: 'failed', data: err.toString()}
    }
}

module.exports = ExpenseReportService;