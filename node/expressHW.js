var express = require('express'),
app = express(),
cons = require('consolidate'),
MongoClient = require('mongodb').MongoClient,
Server = require('mongodb').Server;

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(app.router);
app.use(exp);

function errorHandler(err, req, res, next){
	console.error(err.message);
	console.error(err.stack);
	res.status(500);
	res.render('error_template',{error: err});
}
app.use(errorHandler);

var mongoclient = new MongoClient(new Server('localhost', 27017, {'native_parser': true}));
var db = mongoclient.db('fruit');

app.get('/', function(req, res){
	db.collection('fruit').find({}, function(err ,doc){
		res.render('hello', doc);
	});	
});
app.get('/:name', function(req, res, next){
	var name = req.params.name;
	var getvar1 = req.query.getvar1;
	var getvar2 = req.query.getvar2;
	res.render('hello',{name: name, getvar1: getvar1, getvar2: getvar2});
});
app.get('*', function(req, res){
	res.send('Page not found', 404);
});

mongoclient.open(function(err, mongoclient){
	if (err) throw err
	app.listen(8080);
	console.log('Express server started on port 8080');
});