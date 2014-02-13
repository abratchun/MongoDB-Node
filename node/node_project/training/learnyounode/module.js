var fs = require('fs');
var path = require('path');

module.exports = function(dir, filter, cb){
    fs.readdir(dir, function(err, data){
        if (err)
            return cb(err);
//        var arr = filter(data);
        var arr = [];
        var el = path.extname(data[1]);
        for(var i = 0; i < data.length; i++){
            if (path.extname(data[i]) == el){
                arr.push(data[i]);
            }
        }
        cb(err, arr);
    });
}

