var restify = require('restify');
// var fs = require("fs");
var storage = require('@google-cloud/storage');

var gcs = storage({
	projectId: 'mytickets-nyc-151706',
	keyFilename: 'mytickets-nyc.json'
});
var bucket = gcs.bucket('mytickets-records');


var server = restify.createServer();
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.put('/upload/:filename', (req, res, send)=> {
//	console.log(req.body);
	var remoteWriteStream = bucket.file(req.params.filename).createWriteStream();
	req.pipe(remoteWriteStream);
/*
// Local File Storage
	var wstream = fs.createWriteStream(req.params.filename);
	req.pipe(wstream);
*/
});

server.listen(8001, function() {
	console.log('%s listening at %s', server.name, server.url);
});
