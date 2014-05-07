var config = require('../config');
var sessionStore = require('../libs/sessionStore');
var HttpError = require('../error').HttpError;
var User = require('../models/user').User;
var log = require('../libs/log')(module);
var async =  require('async');
var cookie =  require('cookie');
var connect =  require('connect');

function loadSession(sid, cb){
    sessionStore.load(sid, function(err, session){
        if (arguments.length == 0){
            return cb(null, null);
        }else{
            return cb(null, session);
        }
    });
};
function loadUser(session, cb){
    if(!session.user){
        log.debug('Session %s is anonymous', session.id);
        return cb(null, null);
    }
    log.debug('retrieving user', session.user);

    User.findById(session.user, function(err, user){
        if(err) return cb(err);

        if(!user){
            return cb(null, null);
        }

        log.debug('user findById result: ' + user);
        cb(null, user);
    })

};

module.exports = function(server){
    var io = require('socket.io').listen(server);
    io.set('origins', 'localhost:*');
    io.set('logger', log);

    io.set('authorization', function(handshake, cb){
        async.waterfall([
            function(cb){
                handshake.cookies = cookie.parse(handshake.headers.cookie || '');
                var sidCookie = handshake.cookies[config.get('session:key')];
                var sid = connect.utils.parseSignedCookie(sidCookie, config.get('session:secret'));

                loadSession(sid, cb);
            },
            function(session, cb){
                if(!session){
                    cb(new HttpError(401, "No session"));
                }
                handshake.session = session;
                loadUser(session, cb);
            },
            function(user, cb){
                if (!user){
                    cb(new HttpError(403, "Anonymous session may not connect"));
                }

                handshake.user = user;
                cb(null);
            }
        ], function(err){
            if(!err){
                return cb(null, true);
            }
            if(err instanceof HttpError){
                return cb(null, false);
            }
            cb(err);
        });
    })
    io.sockets.on('session:reload', function(sid){
        var clients = io.sockets.clients();

        clients.forEach(function(client){
            if(client.handshake.session.id != sid) return;

            loadSession(sid, function(err, session){
                if(err){
                    client.emit('error', 'server error');
                    client.disconnect();
                    return;
                }
                if(!session){
                    client.emit('logout');
                    client.disconnect();
                    return;
                }
                client.handshake.session = session;
            });

        })
    });

    io.sockets.on('connection', function (socket) {
        var username = socket.handshake.user.get('username');

        socket.broadcast.emit('join', username);

        socket.on('message', function (text, cb) {
            socket.broadcast.emit('message', username, text);
            cb && cb();
        });

        socket.on('disconnect', function (text, cb) {
            socket.broadcast.emit('leave', username);
        });
    });

    return io;
}