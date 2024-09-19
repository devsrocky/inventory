const salesProductModel = require('../../model/sales/salesProductModel')

const salesReportService = async (Request) => {
    try{
        let UserEmail = Request.headers['email']
        let fromDate = Request.body['fromDate']
        let toDate = Request.body['toDate']

        let data = await salesProductModel.aggregate([
            {$match: {UserEmail:UserEmail, createdDate: {$gte: new Date(fromDate), $lte: new Date(toDate)}}},
            {
                $facet: {
                    Total: [{
                        $group: {
                            _id:0,
                            TotalAmount: {$sum: "$Total"}
                        }
                    }],
                    Rows: [
                        {$lookup: {from: "products", localField: "ProductId", foreignField: "_id", as: "product"}},
                        {$unwind: "$product"},
                        {$lookup: {from: "brands", localField: "BrandId", foreignField: "_id", as: "brand"}},
                        {$lookup: {from: "categories", localField: "CategoryId", foreignField: "_id", as: "category"}}
                    ]
                }
            }
        ])
        return {status: 'success', data: data}

    }catch(err){
        return {status: 'failed', data: err.toString()}
    }
}
module.exports = salesReportService;