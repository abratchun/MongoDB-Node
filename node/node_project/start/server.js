var User = require('./user/index');

function run(){
    var vasya = new User('Vasya');
    var petya = new User('Petya');

    vasya.hello(petya);
}

if(module.parent){
    exports.run = run;
}
else{
    run();
}