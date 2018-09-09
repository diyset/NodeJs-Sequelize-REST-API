const ListOrder = require('../models').ListOrder;
const ItemProduct = require('../models').item_product;
const User = require('../models').User
const Alamat = require('../models').Alamat

module.exports = {

    postOrder(req,res){
            payload = {
                itemId: req.body.itemid,
                quantity: req.body.quantity,
                tanggal_order: new Date(),
                userId: req.body.userid,
                status_order: 'Waiting Payment'
            }
        return User
            .findById(payload.userId)
            .then(result=>{
                if(result){
                    ItemProduct
                        .findById(payload.itemId)
                        .then(item=>{
                            if(item){
                                if(item.stock<payload.quantity){
                                    return res.status(400).send({
                                        code:92,
                                        error:true,
                                        message: 'Stock Tidak Cukup Untuk Pembelian '+payload.quantity+' unit'
                                    })
                                }
                                if(item.stock<0){
                                    return res.status(400).send({
                                        code:99,
                                        error: true,
                                        message: 'Item ini Kehabisan Stock!'
                                    })
                                } 
                                    ListOrder
                                    .create(payload)
                                    .then(order=>{
                                        ItemProduct.update({
                                            stock: item.stock - payload.quantity
                                        },{
                                            where: {
                                                id: item.id
                                            }
                                        })
                                        .then(finnalyProduct=>{
                                            return res.status(201).send({
                                                code:"00",
                                                error:false,
                                                message: 'Order Berhasil!'
                                            })
                                        }).catch((error)=>res.status(400).send(error))
                                    }).catch((error)=>res.status(400).send(error))
                            } else {
                                return res.status(400).send({
                                    code:91,
                                    error:true,
                                    message:'Item Product Not Found!'
                                })
                            }
                        }).catch((error)=>res.status(400).send(error))
                } else {
                    return res.status(400).send({
                        code:90,
                        error:true,
                        message: 'User Not Found!'
                    })
                }
            }).catch((error)=>res.status(400).send(error))
    },
    findAllListOrder(req,res){

        return ListOrder
                .findAll()
                .then(result=>{
                    return res.status(200).send({
                        code:"00",
                        error:false,
                        data: result
                    })
                }).catch((error)=>res.status(400).send(error))
    },
    findAllRetrive(req,res){

        return ListOrder
                .findAll({
                    include: [{
                        model: User,
                        as: 'users',
                        include: [{
                            model: Alamat,
                            as: 'alamats'
                        }]
                    }]
                })
                .then(result=>{
                    if(result){
                        return res.status(200).send({
                            code:"00",
                            error:false,
                            data: result
                        })
                    } else {
                        return res.status(400).send({
                            code:90,
                            error:true,
                            message:'Data Not Found'
                        })
                    }
                }).catch((error)=>res.status(400).send(error))
    }
    
}