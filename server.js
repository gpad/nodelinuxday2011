var http = require('http');
var util = require('util');

var host = '0.0.0.0';
var port = process.env.PORT || 3000;

if (process.env.C9_PORT) {
    host = '0.0.0.0';
    port = process.env.C9_PORT;
}

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello Linux Day!!!\n' + util.inspect(process.env));
}).listen(port, host);
console.log('Server running at http://' + host + ':' + port + '/');