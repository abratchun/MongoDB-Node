/**
 * Created by abratchun on 06.02.14.
 */
var http = require("http");
var url = require("url");

function start(route, handle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");
        route(handle, pathname, response, request);
    }
    http.createServer(onRequest).listen(8888);
    console.log("Server has started.");
}
exports.start = start;

//function start() {
//    http.createServer(function(req, res) {
//        if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
//            // parse a file upload
//            var form = new formidable.IncomingForm();
//            form.parse(req, function(err, fields, files) {
//                res.writeHead(200, {'content-type': 'text/plain'});
//                res.write('received upload:\n\n');
//                res.end(sys.inspect({fields: fields, files: files}));
//            });
//            return;
//        }
//
//        // show a file upload form
//        res.writeHead(200, {'content-type': 'text/html'});
//        res.end(
//            '<form action="/upload" enctype="multipart/form-data" '+
//                'method="post">'+
//                '<input type="text" name="title"><br>'+
//                '<input type="file" name="upload" multiple="multiple"><br>'+
//                '<input type="submit" value="Upload">'+
//                '</form>'
//        );
//    }).listen(8888);
//}

