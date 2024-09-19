const jwt = require("jsonwebtoken")

module.exports = (req, res, next) =>{

    let token = req.headers['token']
    
    jwt.verify(token, "seKcReetK45875", (err, decoded) => {
        if(err){
            console.log(token)
            res.status(401).json({status: 'Unauthorized', data: err.toString()})
        }else{
            req.headers['email'] = decoded['data'];
            next()
        }
    })
    
}