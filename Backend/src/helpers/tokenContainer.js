var token = '';

// get token
module.export.getToken =  function(){
    return token;
}

// set token
module.export.setToken = function(data){
    token = data;
    return token;
}