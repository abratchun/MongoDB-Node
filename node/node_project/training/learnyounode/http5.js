//var http = require('http');
//var fs = require('fs');
//var map = require('through2-map');
console.log(process.argv);
//var req = http.request({port:process.argv[2], method: 'POST'}, function(res){
////    var str = '';
////    res.setEncoding('utf8');
////    res.on('error',(function (err) {
////        console.log(err);
////    }));
////    res.on('data',(function (chunk) {
////        str += chunk;
////    }));
////    str.pipe(map(function (chunk) {
////        return chunk.toString().split('').toUpperCase().join('');
////    })).pipe(req);
////    res.on('data', function (chunk) {
////        console.log( chunk);
////    });
//
//});
//
//req.on('error', function(e) {
//    console.log('problem with request: ' + e.message);
//});
//
//// write data to request body
////req.write('data\n');
////req.write('data\n');
//req.end();
