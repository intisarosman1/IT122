console.log('Welcome to IT122');

import http from 'http';

http.createServer((req,res) => {
    var path = req.url.toLowerCase();
    switch(path) {
        case '/':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Home page \r\n \r\nWelcome to my home page!');
            break;
        case '/about':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('About page \r\n \r\nHello, my name is Intisar Osman. I am studying IT (WEb Development) at Seattle Central College. I love to paint, read, and watch films and TV shows.');
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Not found');
            break;
    }
}).listen(process.env.PORT || 3000);