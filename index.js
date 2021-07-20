console.log('Welcome to IT122');

import http from 'http';
import { parse } from "querystring";
import { getAll, getBook } from './data.js';


http.createServer((req,res) => {
    let url = req.url.split("?");  // separate route from query string
    let query = parse(url[1]); // convert query string to a JS object
    var path = url[0].toLowerCase();
    switch(path) {
        case '/':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(JSON.stringify(getAll()));
            break;
        case '/about':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('About page \r\n \r\nHello, my name is Intisar Osman. I am studying IT (WEb Development) at Seattle Central College. I love to paint, read, and watch films and TV shows.');
            break;
        case '/detail':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(JSON.stringify(getBook(query.title)));
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Not found');
            break;
    }
}).listen(process.env.PORT || 3000);