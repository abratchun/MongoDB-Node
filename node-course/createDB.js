var mongoose =  require('./libs/mongoose');
mongoose.set('debug', true);
var async =  require('async');

function open(callback){
    mongoose.connection.on('open', callback);
};

function dropDatabase(callback){
    var db = mongoose.connection.db;
    db.dropDatabase(callback);
};
function requireModels(cb){
    require('./models/user');

    async.each(Object.keys(mongoose.models), function(modelName, cb){
        mongoose.models[modelName].ensureIndexes(cb);
    }, cb);
};

function createUsers(callback){
    var users = [
        {username: 'Vasya', password: 'password'},
        {username: '2Admin', password: 'password2'},
        {username: 'Admin', password: 'password3'}
    ]
    async.each(users, function(userData, cb){
        var user = new mongoose.models.User(userData);
        user.save(cb);
    },callback)
};

async.series([
    open,
    dropDatabase,
    requireModels,
    createUsers
], function(err, result){
    console.log(arguments);
    mongoose.disconnect();
})