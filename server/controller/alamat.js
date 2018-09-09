const Alamat = require('../models').Alamat

module.exports = {

    findAll(req,res){
        return Alamat
                .findAll()
                .then(result=>{
                    res.status(200).send({
                        code:"00",
                        error: false,
                        data: result
                    })
                }).catch((error)=>res.status(400).send(error))
    }
}