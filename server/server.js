'use strict';

const express = require('express');
const path = require('path');
const morgan = require('morgan');

const port = 3000;
const app = express();

const rootPath = path.resolve(__dirname, '..');
app.use("/static/", express.static(path.resolve(rootPath, 'build/')));

app.use(morgan('dev'));
app.use(express.json());

const router = express.Router();
router.get('*', (req, res) => {
    res.sendFile(path.resolve(rootPath, 'public/index.html'));
});

app.use('/', router);
app.listen(port, () => console.log(`server listen on port ${port}`));
