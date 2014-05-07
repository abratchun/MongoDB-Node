/**
 * Created by abratchun on 07.04.14.
 */
var crypto = require('crypto');
var async = require('async');
var util = require('util');
var mongoose =  require('../libs/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

schema.methods.encryptPassword = function(password){
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.methods.checkPassword =  function(password){
    return this.encryptPassword(password) === this.hashedPassword;
};

schema.virtual('password')
.set(function(password){
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
.get(function(){return this._plainPassword;});

schema.statics.authorize = function(username, password, cb){
    var User = this;
    async.waterfall([
        function(cb){
            User.findOne({username: username},cb);
        },
        function(user, cb){
            if(user){
                if(user.checkPassword(password)){
                    cb(null, user);
                }else{
                    cb(new AuhtError(403, 'Uncorrect password'))
                }
            }else{
                var user = new User({username: username, password: password});
                user.save(function(err){
                    if (err) return cb(err);
                    cb(null, user);
                })
            }
        }
    ],function(err, user){
        cb(err, user)
    });
}

exports.User = mongoose.model('User', schema);


function AuthError(message){
    Error.apply(this, arguments);
    Error.captureSrackTrace(this, AuthError);

    this.message = message || "Error";
}

util.inherits(AuthError, Error);
AuthError.prototype.name = 'AuthError';

exports.AuthError = AuthError;