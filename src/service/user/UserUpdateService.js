
const UserUpdateService = async (Request, DataModel) => {
    try{
        let userUPdate = await DataModel.updateOne({email: Request.headers['email']}, {$set: Request.body})
        return {status: 'success', data: userUPdate}
    }catch(err){
        return {status: 'failed', data: err.toString()}
    }
}

module.exports = UserUpdateService;