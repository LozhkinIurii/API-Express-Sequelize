// FILE: server.js
//
// curl --silent --include "http://localhost:8080/"
// curl --silent --include "http://localhost:8080/search/last/Donovan"
// curl --silent --include "http://localhost:8080/query?first=John&last=Doe"

var express = require('express');

var app = express();
var port = 8080;    // app.listen(8080);

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.status(302).send('Hello World!\n');
})

// https://expressjs.com/en/guide/routing.html#route-parameters
app.get('/search/last/:last', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(302).send(`${JSON.stringify(req.params)}\n`);
})

app.get('/query', (req, res) => {
    let first = req.query.first;
    let last = req.query.last;
    let name = first + ' ' + last;
    res.setHeader('Content-Type', 'application/json');
    res.status(302).send(`${JSON.stringify(req.query)}\n`);
})

app.use((req, res) => {	// Default: any other request
    res.setHeader('Content-Type', 'application/json');
    res.status(404).json({});
});

app.listen(port, () => {
    console.log(`Example server listening at http://localhost:${port}`)
})