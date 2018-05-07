var token = '';

// get token
module.exports.getToken =  function(){
    return token;
}

// set token
module.exports.setToken = function(data){
    token = data;
    return token;
}