
var router = require('express').Router()
const bodyParser = require("body-parser");
var responseHandler = require('../helpers/apiResponse')

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
router.use(bodyParser.urlencoded({
    extended: true
}));
/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
router.use(bodyParser.json());
router.use(function(req, res, next){
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Expose-Headers', 'Authorization');
    res.append('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    if(req.headers.authorization) {
        res.setHeader('Authorization', req.headers.authorization);
    }
    next();
 });
// import controllers 
var privateController = require('./private-controller');
var authCtr = require('./authCtr');

// register route for private controller
router.use('/private', privateController);
router.use('/public', authCtr);


// route export
module.exports = router