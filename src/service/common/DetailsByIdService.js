const { default: mongoose } = require("mongoose");


const DetailsByIdService = async (Request, DataModel) => {
    try{

        let id = Request.params.id;
        let UserEmail = Request.headers['email']

        const ObjectId = mongoose.Types.ObjectId;

        let QueryObject = {}
        QueryObject['_id'] = new ObjectId(id)
        QueryObject['UserEmail'] = UserEmail

        let data = await DataModel.aggregate([
            {$match: QueryObject}
        ])

        return {status: 'success', data: data}

    }catch(err){
        return {status: 'failed', data: err.toString()}
    }
}

module.exports = DetailsByIdService