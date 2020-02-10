const {User} = require('../models')
const createError = require('http-errors')
const {generateToken} = require('../helpers/generateToken')
const {comparePassword} = require('../helpers/comparePassword')

class Controller{
    static register(req, res, next){
        const {name, email, password} = req.body
        User
        .findOne({
            where:{
                email:email
            }
        })
        .then(data =>{
            if(data){
                throw createError(409, 'Email already register')
            }else{
                return User.create({
                    name,
                    email,
                    password
                })
            }
        })
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(err =>{
            next(err)
        })
    }
    
    static login(req, res, next){
        const { email, password } = req.body
        User
        .findOne({
            where:{email:email}
        })
        .then(data =>{
            if (!data) {
                throw createError(404, 'User Not Found') 
            }else{
                if (comparePassword(password, data.password)) {
                    const payload = {
                        id: data.id,
                        email:data.email
                    }
                    const token = generateToken(payload)
                    res.status(200).json({token: token})
                }else{
                    throw createError(401, 'Invalid Email or Password')
                }
            }
        })
        .catch(err =>{
            next(err)
        })
    }
}

module.exports = Controller