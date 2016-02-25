var app = require('http').createServer(handler)
var io = require('socket.io')(app)
var fs = require('fs')

app.listen(8099)

function handler (req, res) {
	console.log(`${req.method} ${req.url}`)
	var route = '/public' + (req.url === '/'? '/index.html' : req.url)
	var file = __dirname + route
	fs.readFile(file,
	function (err, data) {
		if (err) {
			console.error(`cannot load ${route}, because ${err.message}`)
			res.writeHead(500)
			return res.end(`Error loading ${route}`)
		}
		res.writeHead(200)
		res.end(data)
	})
}
