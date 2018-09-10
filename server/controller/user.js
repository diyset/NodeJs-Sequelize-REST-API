const User = require('../models').User
const ListJabatan = require('../models').list_jabatan
const Alamat = require('../models').Alamat
const ListOrder = require('../models').ListOrder
const Op = require('sequelize').Op

module.exports = {
    create(req, res) {
        payload = {
            username: req.body.username,
            email: req.body.email,
            birthday: req.body.birthday,
            codeJabatan: req.body.codejabatan
        }

        return ListJabatan
            .findById(payload.codeJabatan)
            .then(result => {
                if (!result) {
                    return res.status(400).send({
                        code: 90,
                        error: true,
                        message: 'Codejabatan ' + payload.codeJabatan + ' Not Found!'
                    })
                } else {
                    User
                        .findOne({
                            Where: {
                                [Op.like]: [{
                                    username: '%' + payload.username + '%'
                                }]
                            }
                        })
                        .then(result => {
                            if (result) {
                                User
                                    .create(payload)
                                    .then(
                                        todo => {
                                            if (!payload.username  &&
                                                !payload.email  &&
                                                !payload.birthday  &&
                                                !payload.codejabatan ) {
                                                res.status(400).send({
                                                    code: 80,
                                                    error:true,
                                                    message: 'Validasi payload tidak boleh kosong!',
                                                })
                                            } else {
                                                res.status(200).send({
                                                    code: 00,
                                                    error: false,
                                                    message: 'Registrasi Berhasil Dibuat!',
                                                    data: todo
                                                })
                                            }
                                        }
                                    )
                                    .catch(error => res.status(400).send(error))
                            } else {
                                res.status(400).send({
                                    code: 99,
                                    error: true,
                                    message: 'username telah digunakan!'
                                })
                            }
                        }).catch((error) => res.status(400).send(error))
                }
            }).catch((error) => res.status(400).send(error))

    },
    findUserAll(req, res) {
        return User
            .findAll()
            .then(result => {
                if (!result) {
                    res.status(400).send({
                        code: 100,
                        error: true,
                        message: 'Data Not Found'
                    })
                } else {
                    res.status(200).send({
                        code: 00,
                        error: false,
                        data: result
                    })
                }
            }).catch((error) => res.status(400).send(error))
    },
    findUserAllRetrive(req, res) {
        return User
            .findAll({
                include: [{
                    model: ListJabatan,
                    attributes: ['id', 'jobname', 'salary'],
                    as: 'jabatans'
                }, {
                    model: Alamat,
                    attributes: ['id', 'address', 'kota', 'negara', 'kodepos'],
                    as: 'alamats'
                }, {
                    model: ListOrder,
                    as: 'orders'
                }]
            })
            .then(result => {
                if (result) {
                    res.status(200).send({
                        code: 00,
                        error: false,
                        data: result
                    })
                } else {
                    res.status(400).send({
                        code: 80,
                        error: true,
                        message: 'Data Not Found'
                    })
                }
            }).catch((error) => res.status(400).send(error))
    },
    deleteById(req, res) {
        if (!req.body.userId) {
            res.status(400).send({
                code: 90,
                error: true,
                message: 'userId Not Null!'
            })
        } else {
            return User
                .findById(req.body.userId)
                .then(result => {
                    if (result) {
                        User
                            .destroy({
                                where: {
                                    id: req.body.userId
                                }
                            })
                            .then(user => {
                                res.status(200).send({
                                    code: 00,
                                    error: false,
                                    message: 'Data berhasil dihapus id ' + req.body.userId
                                })
                            }).catch((error) => res.status(400).send(error))
                    } else {
                        res.status(400).send({
                            code: 80,
                            error: true,
                            message: `Data Tidak Ditemukan Dengan id ` + req.body.userId
                        })
                    }
                }).catch((error) => res.status(400).send(error))
        }
    },
    updateById(req, res) {

        if (!req.params.userId) {
            return res.status(400).send({
                code: 80,
                error: true,
                message: 'Params Error!'
            })
        }


        return User
            .findById(req.params.userId)
            .then(result => {
                if (result) {

                    ListJabatan
                        .findById(req.body.codejabatan)
                        .then(jabatan => {
                            if (jabatan) {
                                User
                                    .update({
                                        username: req.body.username,
                                        email: req.body.email,
                                        codeJabatan: req.body.codejabatan
                                    }, {
                                        where: {
                                            id: req.params.userId
                                        }
                                    })
                                    .then(user => {
                                        res.status(200).send({
                                            code: 00,
                                            error: false,
                                            message: 'Data berhasil diupdate',
                                        })
                                    }).catch((error) => res.status(400).send(error))

                            } else {
                                return res.status(400).send({
                                    code: 90,
                                    error: true,
                                    message: 'Data Jabatan Not Found!'
                                })
                            }
                        }).catch((error) => res.status(400).send(error))

                } else {
                    res.status(404).send({
                        code: 100,
                        error: true,
                        message: 'Data Not Found!'
                    })
                }
            }).catch(error => res.status(400).send(error))
    },
    addAlamatByUserId(req, res) {

        return User
            .findById(req.params.userid)
            .then(result => {
                if (result) {
                    Alamat
                        .findOne({
                            where: {
                                id: req.params.userid
                            },
                            limit: 1
                        })
                        .then(alamat => {
                            if (!alamat) {
                                Alamat
                                    .create({
                                        address: req.body.address,
                                        kota: req.body.kota,
                                        negara: req.body.negara,
                                        kodepos: req.body.kodepos
                                    })
                                    .then(alamats => {
                                        User
                                            .update({
                                                alamatId: alamats.id
                                            }, {
                                                where: {
                                                    id: req.params.userid
                                                }
                                            })
                                            .then(user => {
                                                return res.status(200).send({
                                                    code: "00",
                                                    error: false,
                                                    message: 'Berhasil menambahkan alamat',
                                                })
                                            })
                                    }).catch((error) => res.status(400).send(error))
                            } else {
                                Alamat
                                    .update({
                                        address: req.body.address,
                                        kota: req.body.kota,
                                        negara: req.body.negara,
                                        kodepos: req.body.kodepos
                                    }, {
                                        where: {
                                            id: req.params.userid
                                        }
                                    })
                                    .then(alamat => {
                                        return res.status(200).send({
                                            code: "00",
                                            error: false,
                                            message: 'Alamat berhasil di update!'
                                        })
                                    }).catch((error) => res.status(400).send(error))
                            }
                        }).catch((error) => res.status(400).send(error))
                } else {
                    return res.status(400).send({
                        code: 90,
                        error: true,
                        message: 'Data User Not Found!'
                    })
                }
            }).catch((error) => res.status(400).send(error))
    }


}