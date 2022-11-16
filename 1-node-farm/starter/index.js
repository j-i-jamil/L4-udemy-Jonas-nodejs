const fs = require('fs');
const http = require('http');
const path = require('path');
const url = require('url');

const port = 3000;
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// const textOut = `This is what we know about the avacado: ${textIn}. ${Date.now()}`;
// console.log(textOut);
// console.log('Reading File ...');

// Non Blocking, Asynchronous way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
// 	fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
// 		console.log(data2);
// 		fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
// 			console.log(data3);
// 			fs.writeFile('./txt/final.txt',`${data2} \n ${data3}`, 'utf-8', err => {
// 				console.log('Your file has been written 😀');
// 			})
// 		})
// 	})
// });

// console.log(`Will read file`);

// Server

const data = fs.readFileSync('./dev-data/data.json', 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
	const pathName = req.url;
	if (pathName === '/overview') {
		res.end(`This is overview page`);
	} else if (pathName === '/product') {
		res.end(`This is product page.`);
	} else if (pathName === '/') {
		res.end(`<h1><bold>Home page</bold></h1>`);
	} else if (pathName === '/api') {
		// res.end(`API`);
		res.end(data);
	} else {
		res.writeHead(404, {
			'Content-type': 'text/html',
			'my-own-header': 'hello-world',
		});
		res.end(`Page not found!!!`);
	}
	// res.end('<h1>Hello from the server!</h1>');
});

server.listen(port, () => {
	console.log(`Listening to request on port ${port}`);
});
