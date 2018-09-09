const Todo = require('../models').Todo;
const TodoItem = require('../models').TodoItem
const User = require('../models').User

module.exports = {
    create(req,res){

        if(req.body.title==null&&req.body.nama){
            return res.status(400).send({
                code:90,
                error:true,
                message:'Validasi Payload!'
            })
        }
        return Todo
            .create({
                title:req.body.title,
            })
            .then(todo=> res.status(201).send(todo))
            .catch(error=> res.status(400).send(error))
    },
    list(req,res){
        return Todo
            .findAll({
                include: [{
                    model: TodoItem,
                    as: 'todoItems'
                },{
                    model: User,
                    as: 'user',
                    attributes: ['id','username','email','birthday','codeJabatan']
                }]
            })
            .then(todos=>{
                if(todos!=null){
                    res.status(200).send({
                        code:"00",
                        error:false,
                        data: todos
                    })
                } else {
                    res.status(400).send({
                        code:90,
                        error:true,
                        message:'Data Not Found!'
                    })
                }
            })
            .catch(error=>res.status(400).send(error))
    },
    listAllTodos(req, res){
        return Todo
            .findAll({
                include: [{
                    model: TodoItem,
                    as: 'todoItems'
                }]
            })
            .then(todos=>{
                if(!todos){
                    return res.status(200).send({
                        code:"00",
                        error:false,
                        data:todos
                    })
                } else {
                    return res.status(400).send({
                        code: 404,
                        error:true,
                        message:'Data Not Found!'
                    })
                }
            })
            .catch(error=>res.status(400).send(error))
    },
    retrive(req,res){
        return Todo
            .findById(req.params.todoId,{
                include: [{
                    model: TodoItem,
                    as: 'todoItems',
                },{
                    model: User,
                    attributes: ['id','username','email','birthday','codeJabatan'],
                    as: 'user'
                }]
            })
            .then(todo=>{
                if(!todo) {
                    return res.status(404).send({
                        code:90,
                        error:true,
                        message: 'Todo Not Found'
                    })
                } else {
                    return res.status(200).send({
                        code:"00",
                        error:false,
                        data:todo
                    })
                }
            })
            .catch(error=> res.status(400).send(error))
    },
    updateTodo(req,res){
        return Todo.findById(req.params.todoId,{
            include: [{
                model: TodoItem,
                as: 'todoItems'
            }]
        })
        .then(todo=>{
            if(!todo){
                return res.status(404).send({
                    message: 'Todo Not Found'
                })
            }
            return todo.update({
                title:req.body.title || todo.title,
            })
            .then(()=> res.status(200).send(todo))
            .catch((error)=> res.status(400).send(error))
        })
        .catch((error)=>res.status(400).send(error))
    },
    createTodoByUserId(req,res){
        if(req.params.userId==null){
            return res.status(400).send({
                code:90,
                error:true,
                message:'Params Error!'
            })
        }
        if(req.body.title==null){
            return res.status(400).send({
                code:91,
                error: true,
                message:'Title Not Null!'
            })
        }
        return User
            .findById(req.params.userId)
            .then(result=>{
                if(result){
                     Todo
                            .create({
                               userId: req.params.userId,
                               title: req.body.title
                            })
                            .then(todo=>{
                                res.status(200).send({
                                    code:"00",
                                    error:false,
                                    message:'Todo berhasil dibuat!',
                                    data: todo
                                })
                            }).catch((error)=>res.status(400).send(error))
                        } else {
                            return res.status(400).send({
                                code:404,
                                error:true,
                                message:'Data User Not Found!'
                            })
                        }
                }).catch((error)=>res.status(400).send(error))
            },
            deleteById(req,res){
                if(req.body.todoId==null && req.body.todoId == ""){
                    return res.status(400).send({
                        code:90,
                        error:true,
                        message:'Validasi Payload'
                    })
                }
                return Todo
                        .findById(req.body.todoId)
                        .then(result=>{
                            if(result!=null){
                                Todo
                                       .destroy({
                                           where: {
                                               id: req.body.todoId
                                           }
                                       })
                                       .then(result=>{
                                           return res.status(200).send({
                                               code:"00",
                                               error:false,
                                               message:'Data todoId : '+req.body.todoId+' berhasil dihapus!'
                                           })
                                       }).catch((error)=>res.status(400).send(error))
                            } else {
                                return res.status(400).send({
                                    code:90,
                                    error:true,
                                    message:'Data Not Found!'
                                })
                            }
                        }).catch((error)=>res.status(400).send(error))
            }
        }
        
                    
                
            