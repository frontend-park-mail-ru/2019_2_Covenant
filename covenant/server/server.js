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

app.use(morgan('dev'));
app.use(body.json());

app.post('/Signup', (req, res) => {
    const login = req.body.nickname;
    const password = req.body.password;
    const email = req.body.email;
    const age = req.body.age;

    if (!password || !email || !age ||
        !(typeof age === 'number' && age > 10 && age < 100)) {
        return res.status(400).json({error: 'Invalid data.'});
    }

    if (users_db[login]) {
        return res.status(400).json({error: 'Already exist.'});
    }

    const user = {login, password, email, age};
    users_db[login] = user;

    res.status(201).json({user});
});

app.post('/Login', (req, res) => {
    const login = req.body.nickname;
    const password = req.body.password;

    if (!login || !password) {
        return res.status(400).json({error: 'Invalid data.'});
    }

    if (!users_db[login] || users_db[login].password !== password) {
        return res.status(400).json({error: 'Doesn\'t exist.'});
    }

    return res.status(200).json({result: 'SUCCESS', username: login});
});

app.listen(port, () => console.log(`server listen on port ${port}`));
