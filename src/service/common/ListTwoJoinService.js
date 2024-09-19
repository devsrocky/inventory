const ListTwoJoinService = async (Request, DataModel, searchArray, joinStage1, joinStage2) => {
    try{

        let pageNo = Number(Request.params.pageNo)
        let perPage = Number(Request.params.perPage)
        let searchValue = Request.params.keyword;
        let UserEmail = Request.headers['email']
        
        let skipRow = (pageNo - 1) * perPage;
        let data;

        if(searchValue !== "0"){

            data = await DataModel.aggregate([
                {$match: {UserEmail:UserEmail}},
                joinStage1, joinStage2,
                {$match: {$or: searchArray}},
                {
                    $facet: {
                        Total: [{$count: "count"}],
                        Rows: [{$skip: skipRow}, {$limit: perPage}]
                    }
                }
            ])

        }else{
            data = await DataModel.aggregate([
                {$match: {UserEmail:UserEmail}},
                joinStage1, joinStage2,
                {
                    $facet: {
                        Total: [{$count: "count"}],
                        Rows: [{$skip: skipRow}, {$limit: perPage}]
                    }
                }
            ])
        }

        return {status: 'success', data: data}

    }catch(err){
        return {status: 'failed', data: err.toString()}
    }
}
module.exports = ListTwoJoinService;