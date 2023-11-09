// FILE: server.js
//
// EXAMPLE CALL
//
// node server.js
// curl 'http://127.0.0.1:8000/app.js?a=1&b=2'

var http = require("http")
var url = require('url')
var qs = require('querystring');
var util = require('util')
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('example.db');
var md5 = require("md5");

var hostname = "127.0.0.1"
var port = 8000

var server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    //   req.url => /app.js?a=1&b=2
    res.write("request URL: " + req.url + '\n');

    // ---------------------------------------------------
    // read and parse the request

    let q = url.parse(req.url, true);  // returns an URL object
    console.log("DATA query URL object: " + q);
    console.log(util.inspect(q, { showHidden: false, depth: null }));

    // ---------------------------------------------------
    // COMMON VARIABLES: see documentation for module 'url'
    //
    // .host      localhost:8080   WARN: can be <null>
    // .pathname  /server.js
    // .search    ?a=1&b=2
    // .query     { key: val, key: val }

    res.write("query.pathname: " + q.pathname + '\n');
    res.write("query.search: " + q.search + '\n');

    console.log("DATA q.query", q.query);
    let params = Object.keys(q.query);
    let a = q.query.a;
    let b = q.query["b"];
    res.write("Param a: " + a + '\n');
    res.write("Param b: " + b + '\n');
    res.write("Parameters: " + params.join(", ") + '\n');

    res.end('Response end\n');
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS test (id INTEGER UNIQUE NOT NULL PRIMARY KEY, info VARCHAR(1000))");

    var stmt = db.prepare("INSERT INTO test (id, info) VALUES (NULL, ?)");

    for (var i = 0; i < 10; i++) {
        stmt.run("password " + md5(i));
    }

    stmt.finalize();

    db.each("SELECT id, info FROM test",
        function (err, row) {
            if (err)
                console.log(err)
            console.log(row.id + ": " + row.info);
        });

    // Print the rows as JSON
    let sql = 'SELECT * FROM test;'
    db.all(sql, function (err, rows) {
        console.log("--- ALL ----------\n")
        console.log(JSON.stringify(rows));
    });

});


db.close();