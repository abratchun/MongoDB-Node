var http = require('http');
var fs = require('fs');

http.createServer(function(request, response) {
    response.writeHead(200);

    fs.readFile('index.html', function(err, cont){
        response.write(cont);
        response.end();
    });
}).listen(8080);
