fs = require('fs');
path = require('path');

fs.readdir('.', function(err, entries) {
	if (err) throw err;
	entries.forEach(function(e) {
		if (path.extname(e) == '.png') {
			console.log(e);
		}
	});
});


