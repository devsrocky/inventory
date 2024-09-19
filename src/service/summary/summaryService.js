
const expenseSummaryService = async (Request, DataModel) => {
    try{
        let UserEmail = Request.headers['email']
        let data = await DataModel.aggregate([
            {$match: {UserEmail:UserEmail}},
            {
                $facet: {
                    Total: [{
                        $group: {
                            _id: 0,
                            TotalAmount: {$sum: "$Amount"}
                        }
                    }],
                    Last30Days: [{
                        $group: {
                            _id: {$dateToString: {format: "%Y-%m-%d", date: "$createdDate"}},
                            TotalAmount: {$sum: "$Amount"}
                        },
                    },
                    {$sort: {_id: -1}},
                    {$limit: 30}
                ]
                }
            }
        ])

        return {status: 'success', data: data}
    }catch(err){
        return {status: 'failed', data: err.toString()}
    }
}

module.exports = expenseSummaryService;