"use strict"

import express from 'express';
import handlebars from "express-handlebars";
import { Book } from './book.js';

const app = express();
app.set("port", process.env.PORT || 3000);
app.use(express.static('./public')); // allows direct navigation to static files
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(express.json()); //Used to parse JSON bodies

app.engine('hbs', handlebars({defaultLayout: false}));
app.set("view engine", "hbs");

// GET requests
app.get('/', (req,res) => {
    Book.find({}).lean()
        .then((books) => {
            res.render('home', { books });
        })
        .catch(err => next(err));
});

// send plain text response
app.get('/about', (req,res) => {
    res.type('text/plain');
    res.send('About page');
   });


app.get('/detail', (req,res,next) => {
    Book.findOne({ title:req.query.title }).lean()
        .then((book) => {
            res.render('details', {result: book} );
        })
        .catch(err => next(err));
});
app.post('/detail', (req,res, next) => {
    Book.findOne({ title:req.body.title }).lean()
        .then((book) => {
            res.render('details', {result: book} );
        })
        .catch(err => next(err));
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