const jwt = require('jsonwebtoken')

const CreateToken = async (data) => {
    let payload = {exp: Math.floor(Date.now() / 1000) + (24*60*60), data: data}
    return await jwt.sign(payload, "seKcReetK45875")
}

module.exports = CreateToken;