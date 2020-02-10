const {Comic} = require('../models')
const createError = require('http-errors')

class Controller {
    static findAll(req, res, next){
        Comic
        .findAll({
            where:{UserId:req.user}
        })
        .then(data =>{
            if (data.length > 0) {
                res.status(200).json(data)
            } else {
                throw createError(404, 'Data Not Found')
            }
        })
        .catch(err =>{
            next(err)
        })
    }
    static findOne(req, res, next){
        Comic
        .findOne({
            where:{
                id:req.params.id
            }
        })
        .then(data =>{
            if(data){
                res.status(200).json(data)
            }else{
                throw createError(404, `Data Not found`)
            }
        })
        .catch(err =>{
            next(err)
        })
    }
    static update(req, res, next){
        const {title, description, status, due_date} = req.body
        Comic.findOne({
            where: {
                id: req.params.id
            }
        })
        .then( data =>{
            if (data.UserId === req.user) {
                return Eample.update({
                    title,
                    description,
                    status,
                    due_date,
                    },{
                        where:{
                            id:req.params.id
                        },
                    returning:true
                })
            }else{
                throw createError(403, 'Forbiden Acces')
            }
        })
        .then(data =>{
            res.status(200).json(data[1][0])
        })
        .catch(err =>{
            next(err)
        })
    }
}

module.exports = Controller