const mongoose = require('mongoose')
const dataSchema = mongoose.Schema({
    email: {type: String},
    otp: {type: String},
    status: {type: Number, default: 0},
    createdDate: {type: Date, default: Date.now()}
})

const OTPSModel = mongoose.model('otps', dataSchema)
module.exports = OTPSModel;