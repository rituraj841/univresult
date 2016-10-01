var chalk = require('chalk');
var mongoose = require( 'mongoose' );

var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;

var dbURI = 'mongodb://127.0.0.1/resultdb';
//var dbURI =  'mongodb://onlineresultuser:onlineresultuser@ds047666.mlab.com:47666/gola';
console.log("Establishing connection to the DB");

//   ****** CONNECTIONS
mongoose.connect(dbURI);
mongoose.connection.on('connected', function () {
  console.log(chalk.yellow('Mongoose connected to ' + dbURI));
});

mongoose.connection.on('error', function (err) {
  console.log(chalk.red('Mongoose connection error: ' + err));
});

mongoose.connection.on('disconnected', function () {
  console.log(chalk.red('Mongoose disconnected'));
});

// ***** *******  *  *****   Schema defs
var userSchema = new mongoose.Schema({		
  username: {type: String, unique:true},
  email: {type: String, unique:true},
  password: String
}, {collection: 'Users'});

var marksSchema = new mongoose.Schema({		
  xname: {type: String, unique:true},
  roll: {type: String, unique:true},
  physics: {type: String},
  chemistry: {type: String},
  maths: {type: String},
  computer: {type: String},
  totalmarks: {type: String},
  percentage: {type: String},
  division: {type: String}
}, {collection: 'studentscorecard'});


// register the User model
mongoose.model( 'User', userSchema);
mongoose.model( 'marksModel', marksSchema);





