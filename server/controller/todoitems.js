const TodoItem = require('../models').TodoItem

module.exports = {
    create(req, res) {

        var message = "";

        function validate() {
            if (!req.body.complete) {
                message = 'Complete Is Not Null';
                return false;
            } else if (!req.body.content) {
                message = "Content Is Not Null";
                return false;
            } else if (!req.body.todoId) {
                message = "Todo Id Is Not Null"
                return false;
            }
            return true;
        }
        if (!validate()) {
            return res.status(400).send({
                code: 90,
                error: true,
                message: message
            })
        }
        return TodoItem
            .create({
                complete: req.body.complete,
                content: req.body.content,
                todoId: req.params.todoId
            })
            .then(todoItem => {
                res.status(200).send({
                    code: "00",
                    error: false,
                    data: todoItem
                })
            })
            .catch(error => res.status(400).send(error))
    }
}