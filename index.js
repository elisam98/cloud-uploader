var restify = require('restify');
var fs = require("fs");
var azure = require('azure-storage');

var server = restify.createServer();
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/hello/:name', (req, res, next)=> {
	res.send('hello ' + req.params.name);
	next();
});

server.put('/upload/:filename', (req, res, send)=> {
	var blobService = azure.createBlobService('myticketsnyc', 'nG16soRh1j9+2tq1/5sufobLpgD1Ja3jupfcXw5HutWv+mLhWGZpUrmWJg/CCWivdTDvhk9ijChCPHmuSd5gMg==');
	blobService.createContainerIfNotExists('recordings', {
		publicAccessLevel: 'blob'
	}, function(error, result, response) {
		if (!error) {
			// if result = true, container was created.
			// if result = false, container already existed.
		}
	});
	blobService.createBlockBlobFromStream('recordings', req.params.filename, req);
/*
	console.log(req.body);
	var wstream = fs.createWriteStream(req.params.filename);
	req.pipe(wstream);
*/
});

server.listen(8001, function() {
	console.log('%s listening at %s', server.name, server.url);
});
