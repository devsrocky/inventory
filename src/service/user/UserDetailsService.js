const UserDetailsService = async (Request, DataModel) => {
    try{
        let data = await DataModel.aggregate([
            {$match: {email: Request.headers['email']}}
        ])
        return {status: 'success', data: data}
    }catch(err){
        return {status: 'failed', data: err.toString()}
    }
}

module.exports = UserDetailsService;