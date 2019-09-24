'use strict';

const express = require('express');
const path = require('path');

const port = 3000;
const app = express();

const staticPath = path.resolve(__dirname, '..', 'public/');
app.use("/", express.static(staticPath));
console.log(staticPath);

const users_db = {
    "Marshality": {
        "email": "marshalityy@gmail.com",
        "password": "12345",
        "age": 21,
    },

    "Floyd": {
        "email": "philipp-is@mail.ru",
        "password": "privet",
        "age": 21
    },

    "pycnick": {
        "email": "o_nikos-gr@mail.ru",
        "password": "juggernaut",
        "age": 21
    }
};

app.get('/me', (req, res) => {
    res.json(users_db["Floyd"]);
});

app.listen(port, () => console.log(`server listen on port ${port}`));
