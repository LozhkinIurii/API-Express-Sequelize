var express = require("express")
var app = express()
var url = require('url')
var qs = require('querystring');
var util = require('util')
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('example.db');
var md5 = require("md5");
var hostname = "localhost"
var port = 8000
// FILE: server.js
//
// curl --silent --include "http://localhost:8080/"
// curl --silent --include "http://localhost:8080/search/last/Donovan"
// curl --silent --include "http://localhost:8080/query?first=John&last=Doe"

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.status(302).send('Hello World!\n');
})

app.get('/get', (req, res) => {
    let q = url.parse(req.url, true);
    const params = Object.keys(q.query);
    const parameter = params[0];
    const columnValue = req.query[parameter];
    const sql = `SELECT * FROM person WHERE ${parameter} = ?;`;
    console.log(columnValue);
    db.all(sql, [columnValue], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ data: rows }); // Send the result as JSON
    });
});


app.get('/api/users', (req, res) => {
    let sql = 'SELECT * FROM person;'
    db.all(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.log("--- ALL ----------\n")
        console.log(JSON.stringify(rows));
        res.json({ data: rows }); // Send the result as JSON
    });
});



app.use((req, res) => {	// Default: any other request
    res.setHeader('Content-Type', 'application/json');
    res.status(404).json({});
});

app.listen(port, () => {
    console.log(`Example server listening at http://${hostname}:${port}`)
});



// db.serialize(() => {
//     db.run("CREATE TABLE IF NOT EXISTS person (id INTEGER UNIQUE NOT NULL PRIMARY KEY, first VARCHAR(1000), last VARCHAR(1000))");

//     var stmt = db.prepare("INSERT INTO person (id, first, last) VALUES (NULL, ?, ?)");
//     let count = 0;

//     for (var i = 0; i < 5; i++) {
//         stmt.run("John" + count++, "Peterson");
//     }

//     stmt.finalize();

//     db.each("SELECT id, first, last FROM person", (err, row) => {
//         if (err)
//             console.log(err)
//         console.log(row.id + ": " + row.first + " " + row.last);
//     });

//     // Print the rows as JSON
//     // let sql = 'SELECT * FROM person;'
//     // db.all(sql, (err, rows) => {
//     //   console.log("--- ALL ----------\n")
//     //   console.log(JSON.stringify(rows));
//     // });

// });


// db.close();