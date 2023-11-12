// FILE: server.js
//
// curl --silent --include "http://localhost:8080/"
// curl --silent --include "http://localhost:8080/search/last/Donovan"
// curl --silent --include "http://localhost:8080/query?first=John&last=Doe"

const { Sequelize, Model, DataTypes } = require('sequelize');
const express = require("express")
const app = express()
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('example.db');
const hostname = "localhost"
const port = 8000

const HTTP_STATUS_OK = 200;
const HTTP_STATUS_CREATED = 201;
const HTTP_STATUS_BADREQ = 400;  // NOK
const HTTP_STATUS_NOT_EXIST = 404;
const INTERNAL_SERVER_ERROR = 500;

const greetingMessage = {
    "message": "Hello World!",
};


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './example.db'
});


class User extends Model { }
User.init({
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    },
    first: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last: {
        type: DataTypes.STRING,
        allowNull: false
        // allowNull defaults to true
    }
}, {
    sequelize,
    tableName: 'users',
    timestamps: false
});


// Create table if not exists
(async () => {
    await sequelize.sync();
})();


app.use(express.json());

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.status(HTTP_STATUS_BADREQ).json(greetingMessage);
})

app.get('/api/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(HTTP_STATUS_OK).json(users);
    } catch (error) {
        console.error(error);
        res.status(INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }

});


app.get('/search', (req, res) => {
    const params = Object.entries(req.query);
    let values = [];
    params.forEach(([key, value]) => {
        values.push(value);
    });
});


app.post('/add', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(HTTP_STATUS_CREATED).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
});

app.patch




app.use((req, res) => {	    // Any other request
    res.setHeader('Content-Type', 'application/json');
    res.status(HTTP_STATUS_NOT_EXIST).json({});
});

app.listen(port, () => {
    console.log(`Example server listening at http://${hostname}:${port}`)
});



