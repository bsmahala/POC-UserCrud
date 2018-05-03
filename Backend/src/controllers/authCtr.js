
var express = require('express')
var responseHandler = require('../helpers/apiResponse')
var validationUtility = require('../helpers/validationUtility')
var tokenContainer = require('../helpers/tokenContainer')
var router = express.Router();

// login public api
router.post('/login', function (req, res) {
    validationUtility.required(req.body, 'email');
    validationUtility.required(req.body, 'password');

    if(req.body.email === 'admin' && req.body.password === 'admin') {
        var t = 'x:' + new Date().getTime();
        res.setHeader('Authorization', t);
        responseHandler.success(res, t);
        tokenContainer.setToken(t);
     } else {
        responseHandler.error(res, 'UserNotAuthrize', 500);
     }
})

router.get('/logout', function (req, res) {
    
})

module.exports = router;