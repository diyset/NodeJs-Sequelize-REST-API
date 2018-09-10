const todoController = require('../controller').todos;
const todoItemsController = require('../controller').todoItems;
const userController = require('../controller').user;
const listJabatanConstroller = require('../controller').listjabatan;
const alamatController = require('../controller').alamat;
const itemProductController = require('../controller').item_product;
const listOrderController = require('../controller').ListOrder

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the todos API'
    }))

    app.get('/api/todosItems/all', todoController.listAllTodos)

    app.post('/api/todos', todoController.create)
    app.get('/api/todos/all', todoController.list)
    app.get('/api/todos', todoController.listAllTodos)
    app.get('/api/todos/:todoId', todoController.retrive)
    app.put('/api/todos/:todoId', todoController.updateTodo)
    app.post('/api/todos/:userId/create', todoController.createTodoByUserId)
    app.post('/api/todos/:todoId/items', todoItemsController.create)
    app.post('/api/todos/delete', todoController.deleteById)

    app.post('/api/user', userController.create)
    app.get('/api/users', userController.findUserAll)
    app.get('/api/users/retrive', userController.findUserAllRetrive)
    app.post('/api/user/delete', userController.deleteById)
    app.post('/api/user/:userId', userController.updateById)
    app.post('/api/:userid/alamat', userController.addAlamatByUserId)

    app.post('/api/:userId/jabatan', listJabatanConstroller.createOneJabatan)
    app.get('/api/jabatans', listJabatanConstroller.getAllJabatan)
    app.get('/api/jabatan/:jabatanId', listJabatanConstroller.getOneJabatan)
    app.post('/api/jabatan', listJabatanConstroller.createOneJabatan)
    app.post('/api/jabatan/:jabatanId/update', listJabatanConstroller.updateSalaryJabatan)
    app.post('/api/jabatan/delete', listJabatanConstroller.deleteById)

    app.get('/api/alamat', alamatController.findAll)

    app.post('/api/product', itemProductController.createProductItem)
    app.get('/api/product/all', itemProductController.findAllProduct)
    app.get('/api/product/retrive', itemProductController.findAllProductRetriveItemProduct)
    app.get('/api/product/:itemId', itemProductController.findOneByIdRetrive)

    app.post('/api/postOrder', listOrderController.postOrder)
    app.get('/api/listorder', listOrderController.findAllListOrder)
    app.get('/api/listorder/retrive', listOrderController.findAllRetrive)
    app.post('/api/product/update', itemProductController.updateByIdProduct)

}
