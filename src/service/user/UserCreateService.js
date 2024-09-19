
const UserCreateService = async (Request, DataModel) => {
    try{
        let PostBody = Request.body;
        let data = await DataModel.create(PostBody)
        return {status: 'success', data: data}
    }catch(err){
        return {status: 'failed', data: err.toString()}
    }
}

module.exports = UserCreateService;