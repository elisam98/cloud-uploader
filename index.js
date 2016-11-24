var restify = require('restify');

var server = restify.createServer();
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/hello/:name', (req, res, next)=> {
	res.send('hello ' + req.params.name);
	next();
});

server.put('/recordings', (req, res, send)=> {
	console.log(req.body);
	res.send(req.body);
});

server.listen(8001, function() {
	console.log('%s listening at %s', server.name, server.url);
});