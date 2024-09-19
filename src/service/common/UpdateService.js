
const UpdateService = async (Request, DataModel) => {
    try{

        let id = Request.params.id;
        let UserEmail = Request.headers['email'];
        let PostBody = Request.body;

        let data = await DataModel.updateOne({_id: id, UserEmail:UserEmail}, {$set: PostBody})

        return {status: 'success', data: data}

    }catch(er){
        return {status: 'failed', data: er.toString()}
    }
}

module.exports =UpdateService