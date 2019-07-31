const fs = require('fs');
const http = require('http');
const url = require('url');

// **** syncronouse way , blocking *****
// const readFile = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(readFile);

// fs.writeFileSync('./txt/start.txt', readFile);
// console.log('file written');

// **** asyncronouse way, non-blocking *****
// fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {
// 	console.log(data);
// });
// console.log('Will read file');

// **** Server *****
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
	const urlPath = req.url;
	if (urlPath === '/' || urlPath === '/overview') {
		res.end('Overview Page');
	} else if (urlPath === '/product') {
		res.end('Products Page');
	} else if (urlPath === '/api') {
		res.writeHead(200, { 'Content-type': 'application/json' });
		res.end(data);
	} else {
		res.writeHead(404, {
			'Content-type': 'text/html',
			'my-own-header': 'hello world'
		});
		res.end('Page not found');
	}

	res.end('Hello From the Server');
});

server.listen(8000, '127.0.0.1', () => {
	console.log('server has starting to listen in port 8000');
});
