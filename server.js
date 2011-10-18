var http = require('http');
var util = require('util');
var fs = require('fs');
var formidable = require('formidable');
var path = require('path');

var host = '0.0.0.0';
var port = process.env.PORT || 3000;
if (process.env.C9_PORT) {
    host = '0.0.0.0';
    port = process.env.C9_PORT;
}
http.createServer(function(req, res) {
    
    if (req.url == '/') {
        fs.readFile('index.html', function(err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            if (err) throw err;
            res.write(data);
            res.end('');
        });
    }
	else if (req.url == '/images.html') {
		res.writeHead(200, { 'Content-Type': 'text/html' });
		fs.readdir('.', function(err, files){
			if (err) throw err;
			
			res.write('<html><body>');
			res.write('<h1>Images</h1>');
			files.forEach(function(fileName) {
				if (path.extname(fileName) == '.jpg') {
					console.log('***' + fileName);
					res.write("<img src=\'" + fileName + "\' /><br />");
				}
			});
			res.write("<a href='/'>home</a>");
			res.end('</body></html>');
			console.log('mandato end');
		});
	}
    else if (req.url == '/upload') {
        var form = new formidable.IncomingForm(),
          files = [],
          fields = [];
        form.uploadDir = '.';
        form.keepExtensions = true;
        form.on('fileBegin', function(name, file) {
            file.path = file.name;
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
	else {
		try {
			fs.readFile('.' + req.url, function(err, data) {
				if (err) {
					res.writeHead(403, {'Content-Type' : 'text/plain'});
					res.end(req.url + ' not found');
				} 
				else {
					res.writeHead(200, { 'Content-Type': 'text/html' });
					res.write(data);
					res.end('');
				}
			});
		}
		catch (err) {
			res.writeHead(403, {'Content-Type' : 'text/plain'});
			res.end(req.url + ' not found');
		}
	}
}).listen(port, host);
console.log('Server running at http://' + host + ':' + port + '/');
