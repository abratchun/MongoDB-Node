/**
 * Created by abratchun on 06.02.14.
 */
var server = require("./server");
var router = require("./route");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;


server.start(router.route, handle);