"use strict"

import * as book from "./data.js";
import express from 'express';
import handlebars from "express-handlebars"

const app = express();
app.set("port", process.env.PORT || 3000);
app.use(express.static('./public')); // allows direct navigation to static files
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(express.json()); //Used to parse JSON bodies

app.engine('hbs', handlebars({defaultLayout: false}));
app.set("view engine", "hbs");

// GET requests
app.get('/', (req,res) => {
    res.render('home', {books: book.getAll()});
});

// send plain text response
app.get('/about', (req,res) => {
    res.type('text/plain');
    res.send('About page');
   });


app.get('/detail', (req,res) => {
    console.log(req.query)
    let result = book.getBook(req.query.title);
    res.render("details", {
        title: req.query.title, 
        result
        }
    );
});

// handle POST
app.post('/detail', (req,res) => {
    console.log(req.body)
    let found = book.getBook(req.body.title);
    res.render("details", {title: req.body.title, result: found, books: book.getAll()});
});

// define 404 handler
app.use((req,res) => {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
    console.log('Express started');    
});