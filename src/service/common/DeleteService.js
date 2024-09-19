const DeleteService = async (Request, DataModel) => {
    try{

        let DeleteId = Request.params.id;
        let UserEmail = Request.headers['email']

        let QueryObjects = {};
        QueryObjects['_id'] = DeleteId;
        QueryObjects['UserEmail'] = UserEmail;

        let deleted = await DataModel.deleteMany(QueryObjects)

        return {status: 'success', data: deleted}

    }catch(err){
        return {status: 'failed', data: err.toString()}
    }
}
module.exports = DeleteService;