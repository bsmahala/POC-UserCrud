
var router = require('express').Router()
var responseHandler = require('../../helpers/apiResponse')
var tokenContainer = require('../../helpers/tokenContainer')


// authorization all request at middle layer

router.use(function(req, res, next){    
    if(req.headers.authorization) {
        console.log(tokenContainer.getToken())
        console.log(req.headers.authorization)
        if(tokenContainer.getToken() !== req.headers.authorization) {
            responseHandler.error(res, 'UserNotAuthrize', 401);
            return;    
        }
        next();
    } else {
        responseHandler.error(res, 'UserNotAuthrize', 401);
    }
 });

// import controllers 
var users = require('./usersCtr')

// register route for user controller
router.use('/users', users)


// route export
module.exports = router;