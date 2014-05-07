/**
 * Created by abratchun on 10.04.14.
 */
var User = require('../models/user').User;
var HttpError = require('../error').HttpError;
var ObjectID = require('mongodb').ObjectID;

exports.list = function(req, res, next){
    User.find({}, function(err, users){
        if (err) return next(err);
        res.json(users);
    });

};

exports.getById = function(req, res, next){
    try{
        var id = new ObjectID(req.params.id);
    }catch(e){
        next(404);
        return;
    }
    User.findById(req.params.id, function(err, user){
        if (err) return next(err);
        if(!user){
//            next(new HttpError(404));
            next(404);
        }
        res.json(user);
    })
}