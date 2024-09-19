const OTPSModel = require('../../model/user/OTPSModel');
const SendEmailto = require('../../utility/SendEmailto');


const UserEmailVerifyService = async (Request, DataModel) => {
    try{
        let email = Request.params['email'];
        let OTPCode = Math.floor(10000 + Math.random() * 50000)

        let UserCount = await DataModel.aggregate([{$match: {email: email}}, {$count: 'total'}])
        if(UserCount.length === 1){

            let subject = `Recieved 5 digit OTP Code`;
            let text = `Use this ${OTPCode} code for reset your user password.`;
            let data = `We've been sent 5 digit otp code to this ${email}`
            
            await OTPSModel.create({email:email, otp:OTPCode})
            SendEmailto(email, subject, text)
            return {status: 'success', data: data}

        }else{
            return {status: 'failed', data: 'No user found'}
        }

    }catch(err){
        return {status: 'failed', data: err.toString()}
    }
}
module.exports = UserEmailVerifyService;