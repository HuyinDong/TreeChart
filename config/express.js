var express = require('express');
var bodyParser = require('body-parser');
var data = require('../app/routes/data.server.router');
var auth = require("http-auth");
module.exports = function(){


    var app = express();

    app.use(bodyParser.urlencoded({extended : true}));

    app.use(bodyParser.json());

    app.set('views','./app/views');

    app.set('view engine', 'ejs');

    app.use(express.static('./public'));
    var basic = auth.basic({
        realm: "Private area",
        file: "htpasswd"
    });
    //app.use(auth.connect(basic));
    data(app);


    return app;

};