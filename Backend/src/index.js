// import controller
var controllers = require('./controllers')
var router = require('express').Router()

// import api response resuable componet
var responseHandler = require('./helpers/apiResponse');


router.use('/', controllers)

//api not found check
router.use(function(req, res){
    responseHandler.error(res,"Api Not Found", 404);
});
//error handler
router.use(function(error, req, res, next) {
    responseHandler.error(res, error.message);
});
// route export
module.exports = router