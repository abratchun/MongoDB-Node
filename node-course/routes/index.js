//var userCtrl = require('../controllers/user');
var checkAuth = require('../middleware/checkAuth');
var mainCtrl = require('../controllers');
var login = require('../controllers/login');
var chat = require('../controllers/chat');
var logout = require('../controllers/logout');

//var checkAuth = require('middleware/checkAuth');

module.exports = function(app) {

    app.get('/', mainCtrl.index);

    app.get('/login', login.loginGet);
    app.post('/login', login.loginPost);

    app.post('/logout', logout.post);

    app.get('/chat', checkAuth, chat.chat);

};
