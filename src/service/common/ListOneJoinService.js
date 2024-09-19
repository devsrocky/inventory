

const ListOneJoinService = async (Request, DataModel, searchArray, joinStage) => {
    try{

        let pageNo = Number(Request.params.pageNo)
        let perPage = Number(Request.params.perPage)
        let searchValue = Request.params.keyword;
        let UserEmail = Request.headers['email']

        let skipRow = (pageNo -1) * perPage;
        let data;

        if(searchValue !== "0"){
            data = await DataModel.aggregate([
                {$match: {UserEmail:UserEmail}},
                joinStage,
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
                joinStage,
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

module.exports = ListOneJoinService;