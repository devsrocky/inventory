const DataModel = require('../../model/user/UserModel')
const OTPSModel = require('../../model/user/OTPSModel')
const UserCreateService = require('../../service/user/UserCreateService')
const UserDetailsService = require('../../service/user/UserDetailsService')
const UserLoginService = require('../../service/user/UserLoginService')
const UserEmailVerifyService = require('../../service/user/UserEmailVerifyService')
const UserOTPVerifyService = require('../../service/user/UserOTPVerifyService')
const UserPassResetService = require('../../service/user/UserPassResetService')
const UserUpdateService = require('../../service/user/UserUpdateService')

exports.Registration = async (req, res) => {
    let data = await UserCreateService(req, DataModel)
    res.status(200).json(data)
}

exports.Login = async (req, res) => {
    let data = await UserLoginService(req, DataModel)
    res.status(200).json(data)
}

exports.UserUpdate = async (req, res) => {
    let data = await UserUpdateService(req, DataModel)
    res.status(200).json(data)
}

exports.UserDetails = async (req, res) => {
    let data = await UserDetailsService(req, DataModel)
    res.status(200).json(data)
}

exports.UserEmailVerify = async (req, res) => {
    let data = await UserEmailVerifyService(req, DataModel)
    res.status(200).json(data)
}

exports.UserOTPVerify = async (req, res) => {
    let data = await UserOTPVerifyService(req, DataModel)
    res.status(200).json(data)
}

exports.UserPassReset = async (req, res) => {
    let data = await UserPassResetService(req, DataModel)
    res.status(200).json(data)
}