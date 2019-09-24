'use strict';

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

const users_db = {
    "Marshality": {
        "login": "Marshality",
        "email": "marshalityy@gmail.com",
        "password": "12345",
        "age": 21,
    },

    "Floyd": {
        "login": "Floyd",
        "email": "philipp-is@mail.ru",
        "password": "privet",
        "age": 21
    },

    "pycnick": {
        "login": "pycnick",
        "email": "o_nikos-gr@mail.ru",
        "password": "juggernaut",
        "age": 21
    }
};

app.post('/signup', (req, res) => {
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

app.listen(port, () => console.log(`server listen on port ${port}`));
