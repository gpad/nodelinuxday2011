var http = require('http');
var util = require('util');
var fs = require('fs');
var host = '0.0.0.0';
var port = process.env.PORT || 3000;
if (process.env.C9_PORT) {
    host = '0.0.0.0';
    port = process.env.C9_PORT;
}
http.createServer(function(req, res) {
    
    console.log(util.inspect(req));
    
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    fs.readFile('index.html', function(err, data) {
        if (err) throw err;
        res.write(data);
        res.end('');
    });
}).listen(port, host);
console.log('Server running at http://' + host + ':' + port + '/');