'use strict';
var fs = require('fs');
var filePath = __dirname+ '/../constants/user.json';

var userdata = null;

// read json file
module.exports.read = function() {
    if(userdata) {
        return userdata;
    }
    
    if(!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '[]');
    }


    let rawdata = fs.readFileSync(filePath);
    if(rawdata) {
        try {
        return userdata = JSON.parse(rawdata);
        } catch(e) {
        return {}
    }
    }
    return {};
};


// write json file
module.exports.write = function(object) {
    userdata = object;
    fs.writeFileSync(filePath, JSON.stringify(object));    
}