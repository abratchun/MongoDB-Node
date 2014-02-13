/**
 * Created by abratchun on 12.02.14.
 */
var http = require('http');
var bl = require('bl');
var concat = require('concat-stream');

console.log(process.argv[2]);

http.get(process.argv[2], function(response){
    response.setEncoding('utf8');
//    var str = '';
//    var i = 0;
//    response.on('data', function(data){
////        str += data;
//        i++;
//    });
//    response.on('end', function () {
//        console.log(i);
////        console.log(str);
//    });
    response.pipe(bl(function (err, data) {
//        console.log('bl');
        console.log(data.length);
    }));
    // or
    response.pipe(concat(function (data) {
//        console.log('concatStream');
        console.log(data.toString());
    }));
});