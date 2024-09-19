const OTPSModel = require('../../model/user/OTPSModel')

const UserPassResetService = async (Request, DataModel) => {
    try{

        let email = Request.params['email'];
        let OTPCode = Request.params['otp'];
        let statusUpdate = 1;
        let newPass = Request.body['password']

        let OTPUsed = await OTPSModel.aggregate([{$match: {email: email, otp: OTPCode, status: statusUpdate}}, {$count: 'total'}])
        if(OTPUsed.length === 1){
            await OTPSModel.deleteOne({email:email, otp: OTPCode})
            let passUpdate = await DataModel.updateOne({email: email}, {password: newPass});
            return {status: 'success', data: passUpdate}
        }else{
            return {status: 'failed', data: 'Something went wrong'}
        }

    }catch(err){
        return {status: 'failed', data: err.toString()}
    }
}

module.exports = UserPassResetService;