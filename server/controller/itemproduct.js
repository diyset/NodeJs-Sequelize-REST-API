const ItemProduct = require('../models').item_product
const TipeItem = require('../models').TipeItem;
const ErrorUtil = require('../constant/ErrorUtil');
module.exports = {
    createProductItem(req, res) {

        payload = {
            namaproduct: req.body.namaproduct,
            tipe_item: req.body.tipeitem,
            harga: req.body.harga,
            stock: req.body.stock
        }
        return TipeItem
            .findById(payload.tipe_item)
            .then(result => {
                if (result) {
                    ItemProduct
                        .create(payload)
                        .then(result => {
                            res.status(201).send({
                                code: "00",
                                error: false,
                                message: 'Data Berhasil disimpan',
                                data: result
                            })
                        }).catch((error) => res.status(400).send(error))

                } else {
                    return res.status(401).send({
                        code: "90",
                        error: true,
                        message: 'Tipe Item pada ID (' + payload.tipe_item + ') tidak ditemukan'
                    })
                }
            }).catch((error) => ErrorUtil.catchError(error))
    },
    findAllProduct(req, res) {

        return ItemProduct
            .findAll()
            .then(result => {
                if (result) {
                    return res.status(200).send({
                        code: "00",
                        error: false,
                        data: result
                    })
                } else {
                    return res.status(400).send({
                        code: 90,
                        error: true,
                        message: 'Data Not Found!'
                    })
                }
            }).catch((error) => ErrorUtil.catchError(error))
    },
    findAllProductRetriveItemProduct(req, res) {
        return ItemProduct
            .findAll({
                include: [{
                    model: TipeItem,
                    as: 'tipeItem'
                }]
            })
            .then(result => {
                if (result) {
                    return res.status(200).send({
                        code: "00",
                        error: false,
                        data: result
                    })
                } else {
                    return res.status(400).send({
                        code: 90,
                        error: true,
                        message: 'Data Not Found!'
                    })
                }
            }).catch((error) => res.status(400).send({
                code: 300,
                error: true,
                message: 'Error Handling',
                error: error
            }))
    },
    findOneById(req, res) {
        return ItemProduct
            .findById(req.body.productid)
            .then(result => {
                if (result) {
                    return res.status(200).send({
                        code: "00",
                        error: false,
                        data: result
                    })
                } else {
                    return res.status(400).send({
                        code: 90,
                        error: true,
                        message: 'Data Not Found!'
                    })
                }
            }).catch((error) => res.status(400).send(error))
    },
    findOneByIdRetrive(req, res) {


        return ItemProduct
            .findOne({
                where: {
                    id: req.params.itemId
                },
                include: [{
                    model: TipeItem,
                    as: 'tipeItem'
                }]
            })
            .then(result => {
                if (result) {
                    return res.status(200).send({
                        code: "00",
                        error: false,
                        data: result
                    })
                } else {
                    return res.status(400).send({
                        code: 90,
                        error: true,
                        message: 'Data Not Found!'
                    })
                }
            }).catch((error) => res.status(400).send(error))
    },
    updateByIdProduct(req, res) {

        return ItemProduct
            .findById(req.body.productId)
            .then(result => {
                if (result) {
                    ItemProduct
                        .update({
                            namaproduct: req.body.namaproduct,
                            tipe_item: req.body.tipeitem,
                            harga: req.body.harga,
                            stock: req.body.stock
                        }, {
                            where: {
                                id: result.id
                            }
                        })
                        .then(item => {
                            return res.status(202).send({
                                code: "00",
                                error: false,
                                message: 'Data Item Product ID(' + result.id + ') Berhasil di Update!'
                            })
                        })
                } else {
                    return res.status(400).send({
                        code: 90,
                        error: true,
                        message: 'Data Not Found!'
                    })
                }
            })
    }

}