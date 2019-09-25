'use strict';
const  users_db = require('./users');

const express = require('express');
const path = require('path');

const port = 3000;
const app = express();

const staticPath = path.resolve(__dirname, '..', 'public/');
app.use("/", express.static(staticPath));
console.log(staticPath);

app.get('/me', (req, res) => {
    res.json(users_db["Floyd"]);
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(staticPath + '/login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(staticPath + '/signup.html'));
});

app.listen(port, () => console.log(`server listen on port ${port}`));
