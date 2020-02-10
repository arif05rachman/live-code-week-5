module.exports = (req, res, next) =>{
    const {verifyToken} = require('../helpers/verifyToken')
    const {User} = require('../models')
    
    try {
        const userToken = verifyToken(req.headers.token)
        User
        .findOne({
            where:{
                id: userToken.id
            }
        })
        .then(data =>{
            if (data) {
                req.user = userToken.id
                next()
            }else{
                throw next({message:'User Not Found'})
            }
        })
    } catch (error) {
        next(error)
    }
}