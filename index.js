var restify = require('restify');
var Busboy = require('busboy');

var server = restify.createServer();
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/hello/:name', (req, res, next)=> {
	res.send('hello ' + req.params.name);
	next();
});

server.put('/upload/:filename', (req, res, send)=> {
	var busboy = new Busboy({ headers: req.headers });
	busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
		console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
		file.on('data', function(data) {
			console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
		});
		file.on('end', function() {
			console.log('File [' + fieldname + '] Finished');
		});
	});
	busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
		console.log('Field [' + fieldname + ']: value: ' + inspect(val));
	});
	busboy.on('finish', function() {
		console.log('Done parsing form!');
		res.send('done');
		res.end();
	});
	req.pipe(busboy);
});

server.listen(8001, function() {
	console.log('%s listening at %s', server.name, server.url);
});
