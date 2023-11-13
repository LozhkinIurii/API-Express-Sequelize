// FILE: server.js
//
// curl --silent --include "http://localhost:8080/"
// curl --silent --include "http://localhost:8080/search/last/Donovan"
// curl --silent --include "http://localhost:8080/query?first=John&last=Doe"

const { Sequelize, Model, DataTypes, Op } = require('sequelize');
const express = require("express");
const app = express();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('example.db');
const hostname = "localhost";
const port = 8000;
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
    }
}, {
    sequelize,
    tableName: 'users',
    timestamps: false
});


const Phone = sequelize.define('Phone', {
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    tableName: 'phones',
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


app.get('/search', async (req, res) => {
    // const params = Object.entries(req.query);
    // const keys = Object.keys(req.query);
    // const values = Object.values(req.query);
    const conditions = Object.entries(req.query).map(([key, value]) => ({ [key]: value }));   // Array of objects, each object has one key/value pair
    try {
        const users = await User.findAll({
            // attributes: [...keys],   // fields (columns to show)
            where: {
                [Op.and]: conditions
            }
        });
        res.status(HTTP_STATUS_OK).json(users);
    } catch (error) {
        console.error(error);
        res.status(INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
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



