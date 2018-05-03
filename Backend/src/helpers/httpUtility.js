var url = require('url');
var exports = module.exports = {};

var defaultLimit = 10;
var defaultPage = 1;

function queryParam(req) {
    return url.parse(req.url, true).query || {};
}

function pagination(req) {
    var queryparam = queryParam(req);
    var page = (queryparam.pageno || defaultPage );
    var pageSize = (queryparam.pagesize || defaultLimit );
    page =  (page - 1) * pageSize;
    return {offset: page, limit : pageSize }
}

exports.queryParam = queryParam;
exports.paginationGet = pagination;