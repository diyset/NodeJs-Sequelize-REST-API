function catchError(error,res) {
    console.log('Error Handling')
    return res.status(400).send({
        code:90,
        error:true,
        message:'Error Handling',
        error: error
    })
}
module.exports = {
    catchError:catchError
}