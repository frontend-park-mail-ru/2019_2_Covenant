'use strict'

const express = require('express');
const path = require('path');

const port = 3000;
const app = express();

app.use("/build", express.static(path.resolve(__dirname, '..', 'build/')));

console.log(path.resolve(__dirname, '..', 'build/'));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', './index.html'));
});

app.listen(port, () => console.log(`server listen on port ${port}`));
