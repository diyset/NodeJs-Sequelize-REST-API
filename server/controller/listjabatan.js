const ListJabatan = require('../models').list_jabatan
const User = require('../models').User
const Op = require('sequelize').Op
module.exports = {

    createOneJabatan(req,res) {
        payload = {
            jobname: req.body.jobname,
            salary: req.body.salary,
        }
        if(payload.jobname==null&&
            payload.salary==null){
          return res.status(400).send({
                code: 80,
                error:true,
                message: 'Validasi payload tidak boleh kosong!'
            })
        }
            return ListJabatan.findOne({
                where: {
                   jobname: payload.jobname
                }
            })
            .then(result=>{
                if(result==null){
                    ListJabatan
                          .create(payload)
                          .then(jabatan=>{
                            return  res.status(200).send({
                                  code:00,
                                  error:false,
                                  message:'Data berhasil disimpan!',
                                  data:jabatan
                              })
                          }).catch((error)=>res.status(400).send(error))
                } else {
                    return res.status(400).send({
                        code:90,
                        error:true,
                        message: 'Job Name is Existing!'
                    })
                }
            }).catch((error)=>res.status(400).send(error))
    },
    getAllJabatan(req,res){
        return ListJabatan
                .findAll()
                .then(result=>{
                if(result!=null){
                        res.status(200).send({
                            code:00,
                            error:false,
                            data:result
                        })
                    } else {
                     return   res.status(400).send({
                            code:100,
                            error:true,
                            message:'Data Not Found!'
                        })
                    }
                }).catch((error)=>res.status(400).send(error))
    },
    getOneJabatan(req,res){
        if(req.params.jabatanId==null){
          return  res.status(404).send({
                code:404,
                error:true,
                message:'Params error'
            })
        }
        return ListJabatan
                .findById(req.params.jabatanId)
                .then(result=>{
                    if(result!=null){
                      return  res.status(200).send({
                            code:00,
                            error:false,
                            data:result
                        })
                    } else {
                      return  res.status(400).send({
                            code:80,
                            error:true,
                            message:'Data Not Found!'
                        })
                    }
                }).catch((error)=>res.status(400).send(error))
    },
    updateSalaryJabatan(req,res){
        return ListJabatan
                .findById(req.params.jabatanId)
                .then(result=>{
                    if(result!=null){
                        ListJabatan
                            .update(
                                {
                                salary: req.body.salary
                            },{
                                where: {
                                    id: req.params.jabatanId
                                }
                            }
                        )
                        .then(jabatan=>{
                           return res.status(200).send({
                                code:"00",
                                error:false,
                                message:'Data berhasil di update!',
                            })
                        }).catch((error)=>res.status(400).send(error))
                    } else {
                            return  res.status(400).send({
                                    code:"90",
                                    error:true,
                                    message:'Data Not Found!'
                                })
                    }
                }).catch((error)=>res.status(400).send(error))
    },
    deleteById(req,res){

        if(req.body.jobId == null){
            return res.status(400).send({
                code:90,
                error:true,
                message:'jobId Not Null!'
            })
        }
        return ListJabatan
                    .findById(req.body.jobId)
                    .then(result=>{
                        if(result!=null){
                            ListJabatan
                                .destroy({
                                    where: {
                                        id: req.body.jobId
                                    }
                                })
                                .then(job=>{
                                  return  res.status(200).send({
                                        code:"00",
                                        error:false,
                                        message:'Data jobId '+req.body.jobId+' Berhasil di hapus!'
                                    })
                                }).catch((error)=>res.status(400).send(error))
                        } else {
                            return res.status(400).send({
                                code:90,
                                error:true,
                                message: 'Data Not Found!'
                            })
                        }
                    }).catch((error)=>res.status(400).send(error))
    }
}