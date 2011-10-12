var http = require('http');

var host = '0.0.0.0';
var port = process.env.C9_PORT;

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello Linux Day!!!\n');
}).listen(port, host);
console.log('Server running at http://' + host + ':' + port + '/');