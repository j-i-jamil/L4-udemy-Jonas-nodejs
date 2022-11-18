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


const replaceTemplate = (temp, product) => {
	let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
	output = output.replace(/{%IMAGE%}/g, product.image);
	output = output.replace(/{%PRICE%}/g, product.price);
	output = output.replace(/{%FROM%}/g, product.from);
	output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
	output = output.replace(/{%QUANTITY%}/g, product.quantity);
	output = output.replace(/{%DESCRIPTION%}/g, product.description);
	output = output.replace(/{%ID%}/g, product.id);

	if (!product.organic) {
		output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
	}

	return output;
};


const tempOverview = fs.readFileSync('./templates/template-overview.html', 'utf-8');
const tempCard = fs.readFileSync('./templates/template-card.html', 'utf-8');
const tempProduct = fs.readFileSync('./templates/template-product.html', 'utf-8');
const data = fs.readFileSync('./dev-data/data.json', 'utf-8');
const dataObj = JSON.parse(data);


const server = http.createServer((req, res) => {
	console.log(req.url);
	console.log(url.parse(req.url, true));
	const pathName = req.url;

	// Overview Page
	if (pathName === '/overview' || pathName === '/') {
		res.writeHead(200, { 'Content-type': 'text/html' });
		const cardsHtml = dataObj.map((el) => replaceTemplate(tempCard, el)).join('');
		// console.log(cardsHtml);
		const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml)
		res.end(output);
	}

	// Product Page
	else if (pathName === '/product') {
		res.end(`This is product page.`);
	}

	// API
	else if (pathName === '/api') {
		res.writeHead(200, { 'Content-type': 'application/json' });
		res.end(data);
	}

	// Not Found
	else {
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
