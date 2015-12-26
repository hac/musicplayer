/*
 * Module dependencies
 */
var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')

var app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);

var jobQueue = require('./simple-job-queue.js');

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.logger('dev'))
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
))
app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {
  res.render('index',
  { title : 'Home' }
  )
});

//jobQueue.newJob('Load Songs from Channel');

var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('songs.json', 'utf8'));

io.on('connection', function(socket){
  console.log('a user connected');
  
  socket.on ('loadSongs', function (callback) {
   	callback(obj);
  });
});

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3000
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
 
server.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", server_port " + port )
});