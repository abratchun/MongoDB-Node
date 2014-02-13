/**
 * Created by abratchun on 12.02.14.
 */
var module = require('./module');

var cb = function(err, data){
    if (err)
        return console.log(err);
    for(var i = 0; i < data.length; i++){
        console.log(data[i]);
    }
};

//var filter = function(data){
//    var arr = [];
//    var el = path.extname(data[1]);
//    for(var i = 0; i < data.length; i++){
//        if (path.extname(data[i]) == el){
//            arr.push(data[i]);
//        }
//    }
//    return arr;
//};

module(process.argv[2], null, cb);


