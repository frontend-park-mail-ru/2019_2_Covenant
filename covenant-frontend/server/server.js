const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('./public/'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'public/index.html'));
});

app.listen(port, () => console.log(`server listen on port ${port}`));
