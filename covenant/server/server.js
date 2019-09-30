'use strict';

const  users_db = require('./users');

const express = require('express');
const fs = require('fs');
const path = require('path');
const body = require('body-parser');
const cookies = require('cookie-parser');
const uuid = require('uuid');
const morgan = require('morgan');

const port = 3000;
const app = express();

const staticPath = path.resolve(__dirname, '..', 'public/');
app.use("/", express.static(staticPath));
console.log(staticPath);

const baseImagePath = '../public/img/';

app.use(morgan('dev'));
app.use(body.json());

app.use(cookies());
const ids = {};

(function applyCORS(server) {
    server.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.header('Access-Control-Allow-Credentials', 'true');

        next();
    });
})(app);

(function checkAuth(server) {
    server.use((req, res, next) => {
        if (req.path === '/login' || req.path === '/signup' ||
            req.path === '/profile' && req.method === 'POST' ||
            req.path === '/upload/avatar') {
            next();
            return;
        }

       const id = req.cookies['covenant'];
       const email = ids[id];

       if (!id || !email) {
           res.clearCookie('authorized');
           res.status(401).json({error: "not authorized"});
           return;
       }

       res.cookie('authorized', true);
       res.status(200).json({auth: true, user: users_db[email]});
    });
})(app);

app.post('/signup', (req, res) => {
    const password = req.body.password;
    const email = req.body.email;

    if (!password || !email) {
        return res.status(400).json({error: 'Invalid data.'});
    }

    if (users_db[email]) {
        return res.status(400).json({error: 'Already exist.'});
    }

    const id = uuid();
    ids[id] = email;
    const user = {email, password};
    users_db[email] = user;

    res.cookie('covenant', id, {expires: new Date(Date.now() + 1000 * 60 * 60 * 24)});
    res.cookie('authorized', true);

    res.status(201).json({user});
});

app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(400).json({error: 'Invalid data.'});
    }

    if (!users_db[email] || users_db[email].password !== password) {
        return res.status(400).json({error: 'Doesn\'t exist.'});
    }

    const id = uuid();
    ids[id] = email;

    res.cookie('covenant', id, {expires: new Date(Date.now() + 1000 * 60 * 60 * 24)});
    res.cookie('authorized', true);

    return res.status(200).json({result: 'SUCCESS', user: users_db[email].username});
});

app.get('/profile', (req, res) => {
    const id = req.cookies['covenant'];
    const email = ids[id];

    if (!id || !email) {
        return res.status(400).json({error: 'Doesn\'t exist.'});
    }

    return res.status(200).json({result: 'SUCCESS', user: users_db[email]});
});

app.post('/profile', (req, res) => {
    const id = req.cookies['covenant'];
    const email = ids[id];

    const name = req.body.name;

    if (!id || !email) {
        return res.status(400).json({error: 'Doesn\'t exist.'});
    }

    users_db[email].username = name;
    return res.status(200).json({result: 'SUCCESS', user: name});
});

app.post('/upload/avatar', (req, res) => {
    const id = req.cookies['covenant'];
    const email = ids[id];

    const file = req.body;
    // const name = req.body.name;
    console.log(req.body);

    if (!id || !email) {
        return res.status(400).json({error: 'Doesn\'t exist.'});
    }

    const imagePath = baseImagePath + 'example.png'; // need name
    users_db[email].avatar =  imagePath;

    fs.writeFile(imagePath, file, (err) => {
        if (err) throw err;
    });

    return res.status(200).json({result: 'SUCCESS', avatar: imagePath});

});

app.listen(port, () => console.log(`server listen on port ${port}`));
