
var express = require('express')
var httputilty = require('../../helpers/httpUtility');
var validationUtility = require('../../helpers/validationUtility');
var jsonUtility = require('../../helpers/jsonUtility');
var responseHandler = require('../../helpers/apiResponse')

var router = express.Router()
// get user list api private
router.get('/list', function (req, res) {
    responseHandler.success(res, jsonUtility.read());
})

// save user api private
router.post('/addupdate', function (req, res) {
    var userData =  req.body;
    var allData = jsonUtility.read();
    if(userData.id) {
        allData = allData.map(e=>e.id === userData.id ? userData : e);
    } else {
        userData.id = new Date().getTime()*2;
        allData.push(userData);
    }

    jsonUtility.write(allData);
    responseHandler.success(res, userData);
})


// delete user api private
router.post('/delete', function (req, res) {
    var userData =  req.body;
    var allData = jsonUtility.read();
    if(userData.id) {
        allData = allData.filter(e=>e.id !== userData.id);
    } else {
        responseHandler.error(res, "Please Provide valid id");
        return;
    }
    jsonUtility.write(allData);
    responseHandler.success(res, userData);
})



module.exports = router