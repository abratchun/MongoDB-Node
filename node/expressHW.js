var express = require('express'),
app = express(),
cons = require('consolidate'),
MongoClient = require('mongodb').MongoClient,
Server = require('mongodb').Server;

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.bodyParser());
app.use(app.router);

function errorHandler(err, req, res, next){
	console.error(err.message);
	console.error(err.stack);
	res.status(500);
	res.render('error_template',{error: err});
}
app.use(errorHandler);

var mongoclient = new MongoClient(new Server('localhost', 27017, {'native_parser': true}));
var db = mongoclient.db('fruits');
app.post('/favorite_fruit', function(req, res, next) {
    var favorite = req.body.fruit;
    if (typeof favorite == 'undefined') {
        next(Error('Please choose a fruit!'));
    }
    else {
        res.send("Your favorite fruit is " + favorite);
    }
});
app.get('/', function(req, res, next){
/*	db.collection('fruit').find({}, function(err ,doc){
		res.render('hello', doc);
	});	
	*/
	//db.collection('fruits').find({}, function(err ,doc){
//		console.log (doc);
	res.render('fruit', {'fruits': ['apple', 'lemon', 'orange']});
	//});	
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