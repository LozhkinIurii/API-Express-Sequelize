// FILE: server.js
//
// curl --silent --include "http://localhost:8080/"
// curl --silent --include "http://localhost:8080/search/last/Donovan"
// curl --silent --include "http://localhost:8080/query?first=John&last=Doe"

var express = require('express');

var app = express();
var port = 8080;    // app.listen(8080);

const express = require("express");

const app = express();
const port = 8080;

const HTTP_STATUS_OK = 200;
const HTTP_STATUS_BADREQ = 400;  // NOK
const HTTP_STATUS_NOT_EXIST = 404;

const greetingMessage = {
  "message": "Hello World!",
};

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.status(HTTP_STATUS_BADREQ).json(greetingMessage);
});

app.get("/query", (req, res) => {
  let first = req.query.first;
  let last = req.query.last;
  let name = first + " " + last;
  res.setHeader("Content-Type", "application/json");
  res.status(HTTP_STATUS_OK).send(`${JSON.stringify(req.query)}\n`);
});

// https://expressjs.com/en/guide/routing.html#route-parameters
app.get('/search/last/:last', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(302).send(`${JSON.stringify(req.params)}\n`);
})

app.use((req, res) => {	// Default: any other request
    res.setHeader('Content-Type', 'application/json');
    res.status(HTTP_STATUS_NOT_EXIST).json({});
});

app.listen(port, () => {
    console.log(`Example server listening at http://localhost:${port}`)
})