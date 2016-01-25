const dgram  = require('dgram');
const udp    = dgram.createSocket('udp4');
var libsbp   = require('libsbp');
var decoder  = libsbp.decode;
var app = require('http').createServer(handler)
var io       = require('socket.io')(app);

app.listen(80);

//handler
function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

udp.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  udp.close();
});

var contents;
udp.on('message', (msg, rinfo) => {
    contents = decoder(msg);
    if ( contents.messageType === 'MSG_POS_ECEF'){
        console.log(contents.fields);
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