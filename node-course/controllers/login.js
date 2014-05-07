/**
 * Created by abratchun on 14.04.14.
 */
var User = require('../models/user').User;
var HttpError = require('../error').HttpError;

exports.loginGet = function(req, res) {
    res.render('login');
};

exports.loginPost = function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    User.authorize(username, password, function(err, user){
        if(err){
            if(err instanceof AuthError){
                return next(new HttpError(403, err.message));
            }else{
                return next(err);
            }
        }
        req.session.user = user._id;
        res.send({});
    })
};