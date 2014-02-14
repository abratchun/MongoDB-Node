//module.exports = exports = this;

var log = require('logger')(module);
var db = require('db');

function User(name){
    this.name = name;
}

User.prototype.hello = function(who){
    log(db.getPhrase('Hello') + who.name)
};

module.exports = User;

//global.User = User;

