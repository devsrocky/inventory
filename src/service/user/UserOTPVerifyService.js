const OTPSModel = require('../../model/user/OTPSModel')

const UserOTPVerifyService = async (Request, DataModel) => {
    try{

        let email = Request.params['email'];
        let OTP = Request.params['otp'];
        let status = 0;
        let statusUpdate = 1;

        let OTPCount = await OTPSModel.aggregate([{$match: {email:email, otp: OTP, status: status}}, {$count: 'total'}])
        if(OTPCount.length === 1){
            let updateOTP =  await OTPSModel.updateOne({email:email, otp: OTP, status: status}, {email:email, otp: OTP, status: statusUpdate})
            return {status: 'success', data: updateOTP}
        }else{
            return {status: 'failed', data: 'OTP Invalid !'}
        }

    }catch(err){
        return {status: 'failed', data: err.toString()}
    }
}
module.exports = UserOTPVerifyService;