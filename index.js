var restify = require('restify');
var fs = require("fs");

var server = restify.createServer();
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/hello/:name', (req, res, next)=> {
	res.send('hello ' + req.params.name);
	next();
});

server.put('/upload/:filename', (req, res, send)=> {
/*
	console.log(req.body);
	var wstream = fs.createWriteStream(req.params.filename);
	req.pipe(wstream);
*/
});

server.listen(8001, function() {
	console.log('%s listening at %s', server.name, server.url);
});
