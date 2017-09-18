var express = require('express');
var app = express();
var port = 8082;
var mongoose = require('mongoose');
var flash = require('connect-flash');
var path = require('path');
var http = require('http');
var server = http.createServer(app);
var configDB = require('./config/database.js');
//var router = express.Router();
var con = require('./app/models/Student');
mongoose.connect(configDB.url);
mongoose.connection.on('connected', function() {
    console.log("connected to 27017");
});
mongoose.connection.on('error', function(err) {
    if (err) {
        console.log("error in connection" + err);
    }
});
app.configure(function() {
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.static(path.join(__dirname, 'public')));
    app.set('views', __dirname + '/views');
    app.engine('html', require('ejs').renderFile);
    app.use(express.session({
        secret: 'errr'
    }));
    app.use(express.bodyParser({
        uploadDir: '/images'
    }));
    app.use(flash());
});

// router.get('/me',function(req,res){
  // con.find(function(err,result){
    // res.json(result);
  // })
// });

require('./app/routes.js')(app, server);

server.listen(port);
console.log('Listening  to  port ' + port);
