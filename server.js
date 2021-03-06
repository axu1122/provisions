// =============
// Requirements
// =============
var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var mongo = require('mongodb');
var db = process.env.MONGOD_URI || 'mongodb://localhost/books_provisions_app';
var port = process.env.PORT || 5000;

// =============
// Middleware
// =============
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

// =============
// DB Connect
// =============
mongoose.connect(db);

// =============
// Controllers
// =============
var bookControllers = require('./controllers/book.js')
app.use('/provisions', bookControllers);


// =============
// LISTEN
// =============
app.listen(port);
console.log('====================================');
console.log('Port ' + port + ', reporting for duty.');
console.log('====================================');



