var condition = function(condition, errorMessage) {
    if(condition) {
        throw new Error(errorMessage);
    }
}

module.exports.condition = condition;
// require validate
module.exports.required = function(obj={}, key, field=null, errorMessage) {
    if(!obj[key]) {
        throw new Error(errorMessage? errorMessage: (field==null? key : field) + ' Required !');
    }
}

module.exports.number = function(obj={}, key, field=null, errorMessage) {
    module.exports.required(obj, key, field);
    if(!Number(obj[key])) {
        throw new Error(errorMessage? errorMessage: (field==null? key : field) + ' must be interger !');
    }
}
