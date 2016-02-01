const dgram    = require('dgram');
const udp      = dgram.createSocket('udp4');
var libsbp     = require('libsbp');
var decoder    = libsbp.decode;
var io         = require('socket.io')(3030);

// set up ========================
var express    = require('express');
var app        = express();                               // create our app w/ express
var morgan     = require('morgan');             // log requests to the console
var bodyParser = require('body-parser');    // pull information from HTML POST

// configuration =================
app.use(express.static('../dist'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

// listen (start app with node server.js) ======================================
app.listen(80);
console.log("App listening on port 80");

udp.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  udp.close();
});

var contents;
udp.on('message', (msg, rinfo) => {
    contents = decoder(msg);
    if ( contents.messageType === 'MSG_BASELINE_NED'){
        io.emit('MSG_BASELINE_NED', contents.fields);
    }
});

udp.on('listening', () => {
  var address = udp.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

udp.bind({
    address: '127.0.0.1',
    port: '13320'
});