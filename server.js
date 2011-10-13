var http = require('http');
var util = require('util');
var fs = require('fs');
var formidable = require('formidable');

var host = '0.0.0.0';
var port = process.env.PORT || 3000;
if (process.env.C9_PORT) {
    host = '0.0.0.0';
    port = process.env.C9_PORT;
}
http.createServer(function(req, res) {
    
    console.log(util.inspect(req));
    
    if (req.url == '/') {
        fs.readFile('index.html', function(err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            if (err) throw err;
            res.write(data);
            res.end('');
        });
    }
    else if (req.url == '/upload') {
        var form = new formidable.IncomingForm(),
          files = [],
          fields = [];
        form.uploadDir = '.';
        form.keepExtensions = true;
        form.on('fileBegin', function(name, file) {
            //console.log("**************");
            //console.log(name);
            //console.log(util.inspect(file));
            file.path = file.name;
            //console.log("**************");
        }).on('field', function(field, value) {
            console.log(field, value);
            fields.push([field, value]);
        }).on('file', function(field, file) {
            console.log(field, file);
            files.push([field, file]);
        }).on('end', function() {
            console.log('-> upload done');
            res.writeHead(200, {
                'content-type': 'text/plain'
            });
            res.write('received fields:\n\n ' + util.inspect(fields));
            res.write('\n\n');
            res.end('received files:\n\n ' + util.inspect(files));
        });
        form.parse(req);
    }
}).listen(port, host);
console.log('Server running at http://' + host + ':' + port + '/');