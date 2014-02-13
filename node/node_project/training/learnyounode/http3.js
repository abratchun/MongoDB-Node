var net = require('net');
var strftime = require('strftime')

var server = net.createServer(function (socket) {
// socket handling logic
//    var date = new Date();
//    socket.write(date.getFullYear().toString()+ "-" + (date.getMonth('mm') + 1 ).toString() + "-" + date.getDate().toString() + ' ' + date.getHours().toString() + ':' + date.getMinutes().toString());
    var date = strftime('%Y-%m-%d %H:%M');
    socket.end(date);
});
server.listen(process.argv[2]);

//"YYYY-MM-DD hh:mm"