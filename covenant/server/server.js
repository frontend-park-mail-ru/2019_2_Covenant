'use strict';

const  users_db = require('./users');

const express = require('express');
const path = require('path');
const body = require('body-parser');
const morgan = require('morgan');

const port = 3000;
const app = express();

const staticPath = path.resolve(__dirname, '..', 'public/');
app.use("/", express.static(staticPath));
console.log(staticPath);


function applyCORS(server) {
    server.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.header('Access-Control-Allow-Credentials', 'true');

        next();
    });
}

app.use(morgan('dev'));
app.use(body.json());

applyCORS(app);

app.post('/signup', (req, res) => {
    const password = req.body.password;
    const email = req.body.email;

    if (!password || !email) {
        return res.status(400).json({error: 'Invalid data.'});
    }

    if (users_db[email]) {
        return res.status(400).json({error: 'Already exist.'});
    }

    const user = {email, password};
    users_db[email] = user;

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

    return res.status(200).json({result: 'SUCCESS'});
});

app.listen(port, () => console.log(`server listen on port ${port}`));
