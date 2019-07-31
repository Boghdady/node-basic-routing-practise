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
const overviewTemplate = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const productTemplate = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const cardTemplate = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
	const urlPath = req.url;
	// Overview Page
	if (urlPath === '/' || urlPath === '/overview') {
		res.writeHead(200, { 'Content-type': 'text/html' });
		res.end(overviewTemplate);
		// Overview Page
	} else if (urlPath === '/product') {
		res.end('Products Page');
		// API Page
	} else if (urlPath === '/api') {
		res.writeHead(200, { 'Content-type': 'application/json' });
		res.end(data);
		// Page not found
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
